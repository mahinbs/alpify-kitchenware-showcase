import React, { useEffect } from 'react';

interface TawkToWidgetProps {
  widgetId?: string;
  enabled?: boolean;
}

const TawkToWidget: React.FC<TawkToWidgetProps> = ({ 
  widgetId = '1i4gfl9ok',
  enabled = true 
}) => {
  useEffect(() => {
    if (!enabled) return;

    // Check if Tawk.to is already loaded
    if (window.Tawk_API) {
      return;
    }

    // Initialize Tawk.to
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/66b060ee1601a2195ba0cc75/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    // Cleanup function
    return () => {
      // Remove Tawk.to widget when component unmounts
      const tawkWidget = document.getElementById('tawk-widget');
      if (tawkWidget) {
        tawkWidget.remove();
      }
    };
  }, [widgetId, enabled]);

  // Tawk.to API methods
  const showWidget = () => {
    if (window.Tawk_API && window.Tawk_API.showWidget) {
      window.Tawk_API.showWidget();
    }
  };

  const hideWidget = () => {
    if (window.Tawk_API && window.Tawk_API.hideWidget) {
      window.Tawk_API.hideWidget();
    }
  };

  const toggleWidget = () => {
    if (window.Tawk_API && window.Tawk_API.toggle) {
      window.Tawk_API.toggle();
    }
  };

  const setAttributes = (attributes: Record<string, any>) => {
    if (window.Tawk_API && window.Tawk_API.setAttributes) {
      window.Tawk_API.setAttributes(attributes);
    }
  };

  const addEvent = (event: string, callback: () => void) => {
    if (window.Tawk_API && window.Tawk_API.addEvent) {
      window.Tawk_API.addEvent(event, callback);
    }
  };

  // Expose methods to window for global access
  useEffect(() => {
    if (window.Tawk_API) {
      window.Tawk_API.showWidget = showWidget;
      window.Tawk_API.hideWidget = hideWidget;
      window.Tawk_API.toggle = toggleWidget;
      window.Tawk_API.setAttributes = setAttributes;
      window.Tawk_API.addEvent = addEvent;
    }
  }, []);

  return null; // This component doesn't render anything visible
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

export default TawkToWidget;
