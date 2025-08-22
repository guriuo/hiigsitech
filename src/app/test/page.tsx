// 1. Create a new folder named "test" inside /src/app/
// 2. Create this new file at: /src/app/test/page.tsx

import { client } from '../../../sanity/lib/client';

// This is the query to get all documents of the type "testItem"
const TEST_ITEMS_QUERY = `*[_type == "testItem"]{ _id, title }`;

export default async function SanityTestPage() {
  // Fetch the data from Sanity using the query
  const testItems = await client.fetch(TEST_ITEMS_QUERY);

  return (
    <div className="pt-32"> {/* Added padding to see content below your navbar */}
      
      <h1 className="text-center text-4xl font-bold">Sanity Connection Test Page</h1>

      {/* This is the test section */}
      <div className="max-w-md mx-auto p-8 bg-gray-100 dark:bg-gray-800 mt-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Connection Status</h2>
        <p className="text-center text-gray-500 mt-2">Data fetched from the Studio:</p>
        
        {/* Check if we got any items and display them */}
        {testItems && testItems.length > 0 ? (
          <ul className="list-disc pl-5 mt-4 bg-white dark:bg-gray-700 p-4 rounded">
            {testItems.map((item: any) => (
              <li key={item._id} className="text-lg font-medium text-green-600 dark:text-green-400">
                ✅ {item.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-red-500 mt-4">❌ Could not find any test items.</p>
        )}
      </div>
    </div>
  );
}

// Optional: This tells Next.js not to cache this page, so you always see the latest data during testing.
export const revalidate = 0;
