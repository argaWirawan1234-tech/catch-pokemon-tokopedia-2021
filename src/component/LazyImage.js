import React from 'react'
import PropTypes from "prop-types";

import LazyLoad from "react-lazyload";

function LazyImage({ src, alt, imgClass, wrapperClass }) {  
    return (
        <div className={wrapperClass}>
          {/* <LazyLoad  once={true} height={200} offset={[500, 0]} placeholder={<div></div>} debounce={500}> */} 
            <img
              className={imgClass}
              src={src}
              alt={alt}
            />
          {/* </LazyLoad> */}
        </div>
    );
  }

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  imgClass: PropTypes.string,
  wrapperClass: PropTypes.string,
};

export default React.memo(LazyImage);