import React, { useEffect } from 'react';

interface DocumentLinkHandlerProps {
  onNavigateToDocument: (documentId: number) => void;
}

const DocumentLinkHandler: React.FC<DocumentLinkHandlerProps> = ({ onNavigateToDocument }) => {
  useEffect(() => {
    // Function to handle clicks on document links
    const handleDocumentLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if the clicked element is an anchor tag
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.tagName === 'A' ? target : target.closest('a');
        const href = link?.getAttribute('href');
        
        // If it's a document link (internal link with doc-id attribute)
        if (link?.hasAttribute('data-doc-id')) {
          event.preventDefault();
          const docId = link?.getAttribute('data-doc-id');
          if (docId) {
            onNavigateToDocument(parseInt(docId, 10));
          }
        }
        // If it's an external link, let the browser handle it normally
        // The target="_blank" attribute will open it in a new tab
      }
    };

    // Add event listener
    document.addEventListener('click', handleDocumentLinkClick);

    // Clean up
    return () => {
      document.removeEventListener('click', handleDocumentLinkClick);
    };
  }, [onNavigateToDocument]);

  // This component doesn't render anything visible
  return null;
};

export default DocumentLinkHandler;
