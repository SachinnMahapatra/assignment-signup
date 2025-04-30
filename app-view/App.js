import React, { useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const webViewRef = useRef(null);

  // Listen to deep links from the browser OAuth flow
  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      const { queryParams } = Linking.parse(url);
      if (queryParams.token && webViewRef.current) {
        const script = `
          localStorage.setItem('auth_token', '${queryParams.token}');
          window.location.reload();
          true;
        `;
        webViewRef.current.injectJavaScript(script);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });
    return () => subscription.remove();
  }, []);

  // URL patterns to intercept (NextAuth API and Google OAuth endpoints)
  const authPatterns = [
    '/api/auth/',
    'accounts.google.com',
    'oauth2.googleapis.com',
  ];

  // Decide whether to open URL in external browser
  const shouldOpenExternally = (url) => {
    return authPatterns.some((pattern) => url.includes(pattern));
  };

  // iOS: intercept before load
  const onShouldStartLoadWithRequest = ({ url }) => {
    if (shouldOpenExternally(url)) {
      Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://assignment-signup-dovt.vercel.app' }}
        style={styles.webview}
        originWhitelist={['*']}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        // Android: intercept during navigation
        onNavigationStateChange={(navState) => {
          const { url } = navState;
          if (shouldOpenExternally(url)) {
            Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
            webViewRef.current?.stopLoading();
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  webview: {
    flex: 1,
  },
});
