import React from 'react';
import ContentLoader from 'react-content-loader';

const ContactLoading = () => {
  return (
    <ContentLoader
      height={81}
      width={'100%'}
      className='px-4'
      speed={1}
      backgroundColor={'#333'}
      foregroundColor={'#999'}
      // viewBox="0 0 380 70"
    >
      {/* Only SVG shapes */}
      <rect x="0" y="15" rx="50%" ry="50%" width="48" height="48" />
      <rect x="60" y="25" rx="4" ry="4" width="200" height="13" />
      <rect x="60" y="45" rx="3" ry="3" width="150" height="10" />
    </ContentLoader>
  );
};

export default ContactLoading;
