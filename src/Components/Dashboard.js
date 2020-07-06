import React, { useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import TagSearch from './Forms/TagSearch';
import RecipeSidebar from './Recipe/RecipeSidebar';


const Dashboard = () => {
    
 
    return (
        <div className='App' >
            <Navigation />
           <div className="header"> 
               <h2>Your Secret Family Recipes!</h2>
            </div>
            <div className='mainbody'>
                <TagSearch />
                <RecipeSidebar />
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;