import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DocumentLayout from '../components/Documents/DocumentLayout';
import { Layout } from '../components/Layout/Header';
// import Footer from '../components/Layout/Footer';

const Documentation: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // document.title = "ClouSec - Platform Overview";
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Documentation | ClouSec</title>
        <meta name="description" content="ClouSec documentation - Learn how to use our platform effectively" />
      </Helmet>
      
      <Layout>
       <DocumentLayout />
       
      </Layout>
      
    </>
  );
};

export default Documentation;
