import React from 'react';
import moment from 'moment'

function FooterDashboard () {
    return (
        <div className="footerDashboard flex justify-center place-items-center text-center
        text-white text-sm md:text-base p-2">
            <div className='flex gap-4 place-items-center'>
                <span>Powered by <i>igea</i></span>
                <img src="/kenjitech.png" alt="logo_kenjitech" className='w-14' />
                <span>Copyright &copy; {moment().format("YYYY")} <i>igea</i></span>
            </div>
        </div>
    );
};

export default FooterDashboard;

