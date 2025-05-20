import React, { useEffect, useState, useCallback } from 'react';
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { FiBold, FiItalic, FiList, FiLink, FiImage, FiAlignLeft, FiAlignCenter, FiAlignRight, FiTable, FiCode } from 'react-icons/fi';
import { fetchDocumentTree, Document } from '../../services/documentApi';

// Create a lowlight instance with common languages
const lowlight = createLowlight(common);

// Import styles for syntax highlighting
import 'highlight.js/styles/github-dark.css';

// Add copy button to code blocks
const addCopyButtonToCodeBlocks = () => {
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(codeBlock => {
    // Skip if already has a copy button
    if (codeBlock.querySelector('.code-copy-button')) return;
    
    const content = codeBlock.textContent || '';
    const language = codeBlock.querySelector('code')?.className.replace('language-', '') || 'text';
    
    // Add language label
    const languageLabel = document.createElement('div');
    languageLabel.className = 'code-block-language-label';
    languageLabel.textContent = language;
    codeBlock.appendChild(languageLabel);
    
    // Add copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'code-block-copy-button';
    copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy';
    
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(content);
      copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
      copyButton.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
      
      setTimeout(() => {
        copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy';
        copyButton.style.backgroundColor = '';
      }, 2000);
    });
    
    codeBlock.appendChild(copyButton);
  });
};

// Process links to add data-doc-id attribute for internal document links
const processDocumentLinks = (documentTree: Document[], currentDocumentId: number) => {
  // Flatten the document tree for easier searching
  const flattenDocumentTree = (docs: Document[], result: Document[] = []): Document[] => {
    docs.forEach(doc => {
      result.push(doc);
      if (doc.children && doc.children.length > 0) {
        flattenDocumentTree(doc.children, result);
      }
    });
    return result;
  };

  const allDocuments = flattenDocumentTree(documentTree);
  
  // Find all links in the document
  const links = document.querySelectorAll('a');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    
    // Check if it's an internal document link (format: #doc-{id})
    if (href && href.startsWith('#doc-')) {
      try {
        const docId = parseInt(href.replace('#doc-', ''), 10);
        
        // Check if the document exists
        const targetDoc = allDocuments.find(doc => doc.id === docId);
        
        if (targetDoc) {
          // Add data attribute for the document link handler
          link.setAttribute('data-doc-id', docId.toString());
          
          // Add title attribute if not present
          if (!link.hasAttribute('title')) {
            link.setAttribute('title', `Go to: ${targetDoc.title}`);
          }
          
          // Add class for styling
          link.classList.add('internal-doc-link');
        }
      } catch (e) {
        console.error('Error processing document link:', e);
      }
    } else if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
      // External link - ensure it has target="_blank"
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      
      // Add external link class
      link.classList.add('external-link');
      
      // Add icon to indicate external link
      if (!link.querySelector('.external-link-icon')) {
        const icon = document.createElement('span');
        icon.className = 'external-link-icon ml-1 text-xs';
        icon.innerHTML = '↗';
        link.appendChild(icon);
      }
    }
  });
};

interface EnhancedTipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
  documentId?: number;
}

const EnhancedTipTapEditor: React.FC<EnhancedTipTapEditorProps> = ({ 
  content, 
  onChange, 
  readOnly = false,
  documentId 
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [linkType, setLinkType] = useState<'external' | 'document'>('external');
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  const [codeLanguage, setCodeLanguage] = useState<string>('javascript');
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [documentTree, setDocumentTree] = useState<Document[]>([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);

  // Fetch document tree for document linking
  useEffect(() => {
    const loadDocumentTree = async () => {
      try {
        const tree = await fetchDocumentTree();
        setDocumentTree(tree);
      } catch (err) {
        console.error('Failed to load document tree for linking:', err);
      }
    };

    if (showLinkModal && linkType === 'document') {
      loadDocumentTree();
    }
  }, [showLinkModal, linkType]);

  // Process document links after content is rendered
  useEffect(() => {
    if (readOnly && documentId) {
      const loadDocumentTreeAndProcessLinks = async () => {
        try {
          const tree = await fetchDocumentTree();
          // Use a small delay to ensure the DOM is fully rendered
          setTimeout(() => {
            processDocumentLinks(tree, documentId);
          }, 100);
        } catch (err) {
          console.error('Failed to load document tree for processing links:', err);
        }
      };
      
      loadDocumentTreeAndProcessLinks();
    }
  }, [readOnly, documentId, content]);

  const supportedLanguages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'python', label: 'Python' },
    { value: 'bash', label: 'Bash' },
    { value: 'sql', label: 'SQL' },
    { value: 'json', label: 'JSON' },
    { value: 'yaml', label: 'YAML' },
  ];

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable the default code block
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
      Image,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: '_blank', // Open external links in new tab
          rel: 'noopener noreferrer', // Security best practice for external links
          class: 'doc-link', // Add a class for styling
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Add copy buttons to code blocks after render
  useEffect(() => {
    if (readOnly) {
      // Use a small delay to ensure the DOM is fully rendered
      const timer = setTimeout(() => {
        addCopyButtonToCodeBlocks();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [readOnly, content]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageModal(false);
    }
  };

  const addLink = () => {
    if (linkType === 'external' && linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkModal(false);
    } else if (linkType === 'document' && selectedDocumentId) {
      // Create a document link with format #doc-{id}
      editor.chain().focus().setLink({ href: `#doc-${selectedDocumentId}` }).run();
      setSelectedDocumentId(null);
      setShowLinkModal(false);
    }
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const addCodeBlock = () => {
    editor
      .chain()
      .focus()
      .toggleCodeBlock({ language: codeLanguage })
      .run();
    setShowCodeModal(false);
  };

  // Recursive function to render document tree for document linking
  const renderDocumentOptions = (documents: Document[], level = 0) => {
    return documents.map(doc => (
      <React.Fragment key={doc.id}>
        <option value={doc.id} style={{ paddingLeft: `${level * 20}px` }}>
          {'\u00A0'.repeat(level * 2)}{level > 0 ? '└─ ' : ''}{doc.title}
        </option>
        {doc.children && doc.children.length > 0 && renderDocumentOptions(doc.children, level + 1)}
      </React.Fragment>
    ));
  };

  if (readOnly) {
    return (
      <div className="prose max-w-none dark:prose-invert">
        <EditorContent editor={editor} />
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap gap-1 p-2 border-b">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Bold"
        >
          <FiBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Italic"
        >
          <FiItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Bullet List"
        >
          <FiList />
        </button>
        <button
          onClick={() => setShowLinkModal(true)}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Add Link"
        >
          <FiLink />
        </button>
        <button
          onClick={() => setShowImageModal(true)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Add Image"
        >
          <FiImage />
        </button>
        <button
          onClick={addTable}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Add Table"
        >
          <FiTable />
        </button>
        <button
          onClick={() => setShowCodeModal(true)}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive('codeBlock') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Add Code Block"
        >
          <FiCode />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Align Left"
        >
          <FiAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Align Center"
        >
          <FiAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Align Right"
        >
          <FiAlignRight />
        </button>
      </div>

      <EditorContent editor={editor} className="p-4 min-h-[300px] prose max-w-none dark:prose-invert" />

      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full p-2 border rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addImage}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Link Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="linkType"
                    value="external"
                    checked={linkType === 'external'}
                    onChange={() => setLinkType('external')}
                    className="mr-2"
                  />
                  External URL
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="linkType"
                    value="document"
                    checked={linkType === 'document'}
                    onChange={() => setLinkType('document')}
                    className="mr-2"
                  />
                  Document Link
                </label>
              </div>
            </div>
            
            {linkType === 'external' ? (
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL (e.g., https://example.com)"
                className="w-full p-2 border rounded mb-4"
                autoFocus
              />
            ) : (
              <select
                value={selectedDocumentId || ''}
                onChange={(e) => setSelectedDocumentId(Number(e.target.value))}
                className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-700"
              >
                <option value="">Select a document</option>
                {renderDocumentOptions(documentTree)}
              </select>
            )}
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowLinkModal(false);
                  setLinkUrl('');
                  setSelectedDocumentId(null);
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addLink}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={(linkType === 'external' && !linkUrl) || (linkType === 'document' && !selectedDocumentId)}
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {showCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Insert Code Block</h3>
            <label className="block text-sm font-medium mb-2">Select Language</label>
            <select
              value={codeLanguage}
              onChange={(e) => setCodeLanguage(e.target.value)}
              className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-700"
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addCodeBlock}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedTipTapEditor;
