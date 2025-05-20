# Implementation of Blog and Case Studies with Pagination

## Components Created/Modified

1. **Pagination Component** (`/src/components/Shared/Pagination.tsx`)
   - Reusable pagination component that handles page navigation
   - Shows page numbers with ellipsis for large page counts
   - Includes previous/next buttons
   - Disables buttons when at first/last page

2. **BlogCard Component** (`/src/components/Blog/BlogCard.tsx`)
   - Displays blog post preview with:
     - Image (if available)
     - Title
     - Date (formatted)
     - Content preview limited to 25 words
     - "Read More" button
     - Admin controls (if user is admin)

3. **CaseStudyCard Component** (`/src/components/CaseStudy/CaseStudyCard.tsx`)
   - Similar to BlogCard but for case studies
   - Displays case study preview with same elements

4. **BlogList Component** (`/src/components/Blog/BlogList.tsx`)
   - Fetches blog data from API
   - Implements pagination logic
   - Detects current route to determine items per page (3 on home page, 6 on blogs page)
   - Uses BlogCard component to display each blog post

5. **CaseStudyList Component** (`/src/components/CaseStudy/CaseStudyList.tsx`)
   - Fetches case study data from API
   - Implements pagination logic
   - Detects current route to determine items per page (3 on home page, 6 on case studies page)
   - Uses CaseStudyCard component to display each case study

6. **HomePage Component** (`/src/Pages/HomePage.tsx`)
   - Includes both BlogList and CaseStudyList components
   - Adds section headers and "View All" links

## Key Features Implemented

- **Responsive Grid Layout**: Cards display in a responsive grid (1, 2, or 3 columns depending on screen size)
- **Dynamic Pagination**: Number of pages adjusts based on available content
- **Route-Aware Display**: Components detect which route they're on and adjust accordingly
- **Content Truncation**: Content is limited to 25 words in preview mode
- **Admin Controls**: Edit/delete buttons appear for admin users
- **Loading States**: Spinner shown while content is loading
- **Error Handling**: Error messages displayed if content fails to load

## How It Works

1. When a user visits the home page, both BlogList and CaseStudyList components detect they're on the home page and display 3 items per page
2. When a user visits the blogs or case studies pages, the respective component detects the route and displays 6 items per page
3. Users can navigate through pages using the pagination controls
4. The "View All" links on the home page take users to the dedicated pages for blogs or case studies
