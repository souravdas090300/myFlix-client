import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * LazyImage component with loading states and error handling
 */
export const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  style = {}, 
  placeholder = '/placeholder-movie.jpg',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoaded(false);
  };

  const imageStyle = {
    ...style,
    opacity: isLoaded ? 1 : 0.7,
    transition: 'opacity 0.3s ease-in-out'
  };

  return (
    <div ref={imgRef} className={`lazy-image-container ${className}`} style={style}>
      {/* Loading placeholder */}
      {!isLoaded && !isError && (
        <div 
          className="d-flex align-items-center justify-content-center bg-light"
          style={{
            ...style,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={isError ? placeholder : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={imageStyle}
          className={className}
          {...props}
        />
      )}
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  placeholder: PropTypes.string
};
