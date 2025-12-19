import { createContext, useCallback, useContext, useReducer } from 'react';

const initialState = {
  modals: {
    gallery: {
      isOpen: false,
      images: [],
      title: '',
    },
    review: {
      isOpen: false,
      reviewData: null,
    },
    notification: {
      isOpen: false,
      message: '',
      type: 'success',
    },
  },
};

const ACTIONS = {
  OPEN_GALLERY: 'OPEN_GALLERY',
  CLOSE_GALLERY: 'CLOSE_GALLERY',
  OPEN_REVIEW: 'OPEN_REVIEW',
  CLOSE_REVIEW: 'CLOSE_REVIEW',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  CLOSE_NOTIFICATION: 'CLOSE_NOTIFICATION',
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.OPEN_GALLERY:
      return {
        ...state,
        modals: {
          ...state.modals,
          gallery: {
            isOpen: true,
            images: action.payload.images,
            title: action.payload.title,
          },
        },
      };

    case ACTIONS.CLOSE_GALLERY:
      return {
        ...state,
        modals: {
          ...state.modals,
          gallery: {
            ...state.modals.gallery,
            isOpen: false,
          },
        },
      };

    case ACTIONS.OPEN_REVIEW:
      return {
        ...state,
        modals: {
          ...state.modals,
          review: {
            isOpen: true,
            reviewData: action.payload,
          },
        },
      };

    case ACTIONS.CLOSE_REVIEW:
      return {
        ...state,
        modals: {
          ...state.modals,
          review: {
            ...state.modals.review,
            isOpen: false,
            reviewData: null,
          },
        },
      };

    case ACTIONS.OPEN_NOTIFICATION:
      return {
        ...state,
        modals: {
          ...state.modals,
          notification: {
            isOpen: true,
            message: action.payload.message,
            type: action.payload.type || 'info',
          },
        },
      };

    case ACTIONS.CLOSE_NOTIFICATION:
      return {
        ...state,
        modals: {
          ...state.modals,
          notification: {
            ...state.modals.notification,
            isOpen: false,
          },
        },
      };

    default:
      return state;
  }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const navItems = [
    { id: 'assortment', label: 'Ассортимент' },
    { id: 'stages', label: 'Этапы работы' },
    { id: 'aboutUs', label: 'О нас' },
    { id: 'faq', label: 'Вопросы' },
  ];

  const isDesktopDevice = () => {
    if (typeof window === 'undefined') return false;

    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipod|phone/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent) && !isMobile;

    return !isMobile && !isTablet;
  };

  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    if (isDesktopDevice()) {
      document.body.style.paddingRight = '15px';
    }
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
  }, []);

  const openGallery = useCallback(
    (images, title) => {
      dispatch({
        type: ACTIONS.OPEN_GALLERY,
        payload: { images, title },
      });
      lockScroll();
    },
    [lockScroll],
  );

  const closeGallery = useCallback(() => {
    dispatch({ type: ACTIONS.CLOSE_GALLERY });
    unlockScroll();
  }, [unlockScroll]);

  const openReview = useCallback(
    reviewData => {
      dispatch({
        type: ACTIONS.OPEN_REVIEW,
        payload: reviewData,
      });
      lockScroll();
    },
    [lockScroll],
  );

  const closeReview = useCallback(() => {
    dispatch({ type: ACTIONS.CLOSE_REVIEW });
    unlockScroll();
  }, [unlockScroll]);

  const openNotification = useCallback((message, type = 'info') => {
    dispatch({
      type: ACTIONS.OPEN_NOTIFICATION,
      payload: { message, type },
    });
    lockScroll();
    setTimeout(() => {
      dispatch({ type: ACTIONS.CLOSE_NOTIFICATION });
    }, 5000);
  }, [lockScroll]);

  const closeNotification = useCallback(() => {
    dispatch({ type: ACTIONS.CLOSE_NOTIFICATION });
    unlockScroll();
  }, [unlockScroll]);

  const value = {
    state,
    modals: state.modals,
    openGallery,
    closeGallery,
    openReview,
    closeReview,
    openNotification,
    closeNotification,
    navItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Хук для модалки галереи
export const useGalleryModal = () => {
  const {
    modals: { gallery },
    openGallery,
    closeGallery,
  } = useAppContext();

  return {
    isOpen: gallery.isOpen,
    images: gallery.images,
    title: gallery.title,
    openGallery,
    closeGallery,
  };
};

// Хук для модалки отзыва
export const useReviewModal = () => {
  const {
    modals: { review },
    openReview,
    closeReview,
  } = useAppContext();

  return {
    isOpen: review.isOpen,
    reviewData: review.reviewData,
    openReview,
    closeReview,
  };
};

// Хук для уведомлений
export const useNotification = () => {
  const {
    modals: { notification },
    openNotification,
    closeNotification,
  } = useAppContext();

  return {
    isOpen: notification.isOpen,
    message: notification.message,
    type: notification.type,
    openNotification,
    closeNotification,
  };
};
