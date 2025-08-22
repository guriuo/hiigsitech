'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { MessageSquare, CornerDownRight, ShieldCheck } from 'lucide-react';
import CommentForm, { CommentFormData } from './CommentForm';

// --- Type Definitions ---
type Reply = {
  _id: string;
  name: string;
  comment: string;
  createdAt: string;
  isAdmin?: boolean;
};
type Comment = Reply & {
  replies?: Reply[];
};

// --- Main Comment Section Component ---
export default function CommentSection({ initialComments, postId }: { initialComments: Comment[]; postId: string }) {
  const [comments, setComments] = useState<Comment[]>(initialComments || []);

  const handlePostComment = async (data: CommentFormData, parentId?: string) => {
    const optimisticComment: Comment = {
      ...data,
      _id: `optimistic-${Date.now()}`,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    // --- The Optimistic Update Logic ---
    if (parentId) {
      // It's a reply, add it to the parent's replies array
      setComments(currentComments =>
        currentComments.map(c =>
          c._id === parentId
            ? { ...c, replies: [...(c.replies || []), optimisticComment] }
            : c
        )
      );
    } else {
      // It's a top-level comment
      setComments(currentComments => [...currentComments, optimisticComment]);
    }

    // --- Send to API in the background ---
    try {
      const res = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, postId, parentId }),
      });

      if (!res.ok) throw new Error('Failed to post comment');
      // On success, we could re-fetch to get real data, but for now, we leave the optimistic one.
    } catch (error) {
      console.error(error);
      // On error, roll back the optimistic update
      setComments(currentComments => currentComments.filter(c => c._id !== optimisticComment._id));
      alert("Error: Your comment could not be posted.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
      <h2 className="font-poppins text-2xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-3">
        <MessageSquare />
        Join the Discussion
      </h2>
      <CommentForm onSubmit={(data) => handlePostComment(data)} />
      <div className="mt-12 space-y-8">
        {comments.map(comment => (
          <CommentThread key={comment._id} comment={comment} onPostReply={handlePostComment} />
        ))}
      </div>
    </div>
  );
}

// --- Individual Comment Thread Component ---
function CommentThread({ comment, onPostReply }: { comment: Comment; onPostReply: (data: CommentFormData, parentId?: string) => void }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const adminStyles = comment.isAdmin ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700";

  return (
    <div>
      <div className={`p-4 rounded-lg border ${adminStyles}`}>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-gray-900 dark:text-white">{comment.name}</h4>
            {comment.isAdmin && <ShieldCheck className="w-5 h-5 text-blue-500" title="Admin" />}
          </div>
          <time className="text-xs text-gray-500 dark:text-gray-400">{format(new Date(comment.createdAt), 'MMM d, yyyy')}</time>
        </div>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{comment.comment}</p>
        <button onClick={() => setShowReplyForm(!showReplyForm)} className="mt-3 text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
          <CornerDownRight className="w-4 h-4" /> Reply
        </button>
        {showReplyForm && (
          <CommentForm
            isReplyForm={true}
            onSubmit={async (data) => {
              await onPostReply(data, comment._id);
              setShowReplyForm(false);
            }}
          />
        )}
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 mt-4 space-y-4 border-l-2 border-gray-200 dark:border-gray-700 pl-6">
          {comment.replies.map(reply => (
            <div key={reply._id} className={`p-4 rounded-lg border ${reply.isAdmin ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700"}`}>
               <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900 dark:text-white">{reply.name}</h4>
                      {reply.isAdmin && <ShieldCheck className="w-5 h-5 text-blue-500" title="Admin" />}
                  </div>
                  <time className="text-xs text-gray-500 dark:text-gray-400">{format(new Date(reply.createdAt), 'MMM d, yyyy')}</time>
              </div>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{reply.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}