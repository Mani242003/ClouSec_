import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CaseStudy, fetchCaseStudies, deleteCaseStudy, getAdminCredentials } from '../../services/api';
import CaseStudyCard from './CaseStudyCard';
import Pagination from '../Shared/Pagination';
import { Helmet } from 'react-helmet';
import Footer from '../Layout/Footer';

type controlShow = {
  isVisible?: boolean; // optional prop
};

const CaseStudyList: React.FC <controlShow> = ({ isVisible = true }) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const isAdmin = !!getAdminCredentials();
  const location = useLocation();
  
  // Determine if we're on the home page or case studies page
  const isHomePage = location.pathname === '/';
  
  // Set items per page based on the current route
  const itemsPerPage = isHomePage ? 3 : 6;

  useEffect(() => {
    const loadCaseStudies = async () => {
      try {
        setLoading(true);
        const data = await fetchCaseStudies();
        setCaseStudies(data);
        setError(null);
      } catch (err) {
        setError('Failed to load case studies. Please try again later.');
        console.error('Error loading case studies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCaseStudies();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      try {
        await deleteCaseStudy(id);
        setCaseStudies(caseStudies.filter(study => study.id !== id));
      } catch (err) {
        setError('Failed to delete case study. Please try again.');
        console.error('Error deleting case study:', err);
      }
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(caseStudies.length / itemsPerPage);
  
  // Get current case studies for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCaseStudies = caseStudies.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

    useEffect(() => {
    window.scrollTo(0, 0);
    // document.title = "ClouSec - Platform Overview";
  }, []);

  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (

   <>
   
    <Helmet>
        {/* <title>Case Studies | ClouSec</title> */}
      </Helmet>
    <div className="container mx-auto px-4 py-8 pt-[80px]">
      {!isHomePage && (
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Case Studies</h1>
          {isAdmin && (
            <Link 
              to="/admin/case-studies/new" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
            >
              Create New Case Study
            </Link>
          )}
        </div>
        
      )}

      {caseStudies.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">No case studies found.</p>
        </div>
        
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCaseStudies.map(caseStudy => (
              <CaseStudyCard 
                key={caseStudy.id} 
                caseStudy={caseStudy} 
                isAdmin={isAdmin} 
                onDelete={handleDelete} 
              />
            ))}
            
          </div>
          
         {
          isVisible && (
             <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
          )

         }
          
          {/* {isHomePage && caseStudies.length > itemsPerPage && (
            <div className="text-center mt-6">
              <Link 
                to="/case-studies" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
              >
                View All Case Studies
              </Link>
              
            </div>
          )} */}
          
        </>
        
      )}
    </div>

 {!isHomePage && (
    <Footer />
 )}
    
    
   </>
  );
};

export default CaseStudyList;
