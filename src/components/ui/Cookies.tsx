'use client';

import { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';

type PreferenceCategory = 'necessary' | 'functional' | 'performance' | 'analytical';

const COOKIE_SETTINGS_KEY = 'cookie_preferences';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always enabled
    functional: false,
    performance: false,
    analytical: false,
  });

  // Check for existing cookie preferences on mount
  useEffect(() => {
    const savedPreferences = getCookie(COOKIE_SETTINGS_KEY);
    if (!savedPreferences) {
      setIsVisible(true);
    } else {
      setPreferences(JSON.parse(savedPreferences as string));
    }
  }, []);

  const handleCheckboxChange = (category: PreferenceCategory) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSavePreferences = () => {
    setCookie(COOKIE_SETTINGS_KEY, JSON.stringify(preferences), { maxAge: 365 * 24 * 60 * 60 });
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      functional: true,
      performance: true,
      analytical: true,
    };
    setCookie(COOKIE_SETTINGS_KEY, JSON.stringify(allPreferences), { maxAge: 365 * 24 * 60 * 60 });
    setPreferences(allPreferences);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const minimalPreferences = {
      necessary: true,
      functional: false,
      performance: false,
      analytical: false,
    };
    setCookie(COOKIE_SETTINGS_KEY, JSON.stringify(minimalPreferences), { maxAge: 365 * 24 * 60 * 60 });
    setPreferences(minimalPreferences);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <p>
          We use cookies to improve your experience. You can customize your preferences below.
        </p>
        <form className="flex flex-col gap-2">
          <div>
            <input
              type="checkbox"
              id="necessary"
              checked
              disabled
              className="mr-2"
            />
            <label htmlFor="necessary">Necessary Cookies (always enabled)</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="functional"
              checked={preferences.functional}
              onChange={() => handleCheckboxChange('functional')}
              className="mr-2"
            />
            <label htmlFor="functional">Functional Cookies</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="performance"
              checked={preferences.performance}
              onChange={() => handleCheckboxChange('performance')}
              className="mr-2"
            />
            <label htmlFor="performance">Performance Cookies</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="analytical"
              checked={preferences.analytical}
              onChange={() => handleCheckboxChange('analytical')}
              className="mr-2"
            />
            <label htmlFor="analytical">Analytical Cookies</label>
          </div>
        </form>
        <div className="flex gap-2">
          <button
            onClick={handleRejectAll}
            className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-100"
          >
            Reject All
          </button>
          <button
            onClick={handleSavePreferences}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-100"
          >
            Save Preferences
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
