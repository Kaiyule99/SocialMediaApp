import React from 'react';

export const HomeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
export const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
  </svg>
);
export const CardinalLogo = ({ className }) => (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="#D9262E" d="M148.8,33.4c-8.9-8.9-23.3-8.9-32.2,0L99.9,50.1l-16.7-16.7c-8.9-8.9-23.3-8.9-32.2,0s-8.9,23.3,0,32.2l16.7,16.7L50.1,99.9c-8.9,8.9-8.9,23.3,0,32.2c4.4,4.4,10.2,6.6,16.1,6.6s11.7-2.2,16.1-6.6l16.7-16.7l16.7,16.7c4.4,4.4,10.2,6.6,16.1,6.6s11.7-2.2,16.1-6.6c8.9-8.9,8.9-23.3,0-32.2L149,99.9l16.7-16.7C157.7,56.7,157.7,42.3,148.8,33.4z M132.8,116.1c-2.9,2.9-7.7,2.9-10.6,0L99.9,93.8l-22.3,22.3c-2.9,2.9-7.7,2.9-10.6,0s-2.9-7.7,0-10.6l22.3-22.3L66.9,60.8c-2.9-2.9-2.9-7.7,0-10.6s7.7-2.9,10.6,0l22.3,22.3l22.3-22.3c2.9-2.9,7.7-2.9,10.6,0s2.9,7.7,0,10.6L110.5,83.2l22.3,22.3C135.7,108.4,135.7,113.2,132.8,116.1z" />
      <path fill="#B91C1C" d="M117.6,9.8c-10.5-2.2-21.5,1-29.4,8.9L51.4,55.5c-8.5,8.5-11.1,20.6-6.8,31.4l41.1,101.9c4.3,10.8,16.4,16.5,27.1,12.2l36.8-14.8c10.8-4.3,16.5-16.4,12.2-27.1l-22-54.8c10-2.4,18.4-9,23.2-18.4c5.3-10.3,4.4-22.5-2.6-31.7L117.6,9.8z" />
      <path fill="#F44336" d="M110.8,40.1c-3.1-4.9-8.8-7.7-14.7-7.2c-7.9,0.7-14.5,6.2-16.5,13.8c-2,7.6,0.3,15.6,5.8,20.9l36.5,35.4c5.5,5.3,13.5,6.8,20.1,3.4c6.6-3.4,10.6-10.1,10.1-17.3c-0.5-7.2-5.4-13.4-12.2-15.8L110.8,40.1z"/>
    </svg>
);
