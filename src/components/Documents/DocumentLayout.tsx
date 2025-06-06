import React, { useState, useEffect } from 'react';
import DocumentSidebar from './DocumentSidebar';
import DocumentBreadcrumb from './DocumentBreadcrumb';
import EnhancedDocumentEditor from './EnhancedDocumentEditor';
import { Document, fetchDocumentTree } from '../../services/documentApi';

const DocumentLayout: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load the first document by default when the component mounts
  useEffect(() => {
    const loadFirstDocument = async () => {
      try {
        // Fetch the document tree
        const documentTree = await fetchDocumentTree();
        
        // If there are documents, select the first one
        if (documentTree.length > 0) {
          setSelectedDocument(documentTree[0]);
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to load initial document:', error);
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      loadFirstDocument();
    }
  }, [isInitialized]);

  const handleSelectDocument = (document: Document | null) => {
    setSelectedDocument(document);
  };

  const handleNavigate = (documentId: number) => {
    // If documentId is 0, we're navigating to the root (no document selected)
    if (documentId === 0) {
      setSelectedDocument(null);
      return;
    }
    
    // Otherwise, we need to update the selected document
    // The sidebar will handle fetching the document details
    if (selectedDocument?.id !== documentId) {
      setSelectedDocument({ id: documentId } as Document);
    }
  };

  const handleDocumentUpdated = () => {
    // Refresh the document if needed
    if (selectedDocument) {
      setSelectedDocument({ ...selectedDocument });
    }
  };

  return (
    <div className="flex flex-col h-full ">
      <DocumentBreadcrumb 
        documentId={selectedDocument?.id || null} 
        onNavigate={handleNavigate} 
      />
      
      <div className="flex flex-1 overflow-hidden ">
        {/* Sidebar with fixed position */}
        <div className="w-64 flex-shrink-0">
          <DocumentSidebar 
            onSelectDocument={handleSelectDocument} 
            selectedDocumentId={selectedDocument?.id || null} 
          />
        </div>
        
        {/* Main content area with left margin to account for fixed sidebar */}
        <div className="flex-1 overflow-y-auto ml-10">
          <EnhancedDocumentEditor 
            documentId={selectedDocument?.id || null} 
            onDocumentUpdated={handleDocumentUpdated}
            onNavigateToDocument={handleNavigate}
          />
        </div>
      </div>
      
    </div>
  );
};

export default DocumentLayout;
