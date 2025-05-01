import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, Linking, Platform, StatusBar, StyleSheet, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const webViewRef = useRef(null);
  const [token, setToken] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    // Use the Android OAuth client ID you just created
    androidClientId: '327385352269-1mhsp6g1vvpgb0fhc08v5sog46nldrqk.apps.googleusercontent.com',
    // Use your custom URI scheme for standalone/dev-client builds
    redirectUri:     makeRedirectUri({ scheme: 'assignment' }),
    scopes:          ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setToken(response.authentication.accessToken);
    }
  }, [response]);

  if (!token) {
    // this must be your first screen!
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => promptAsync()}
        />
      </View>
    );
  }

  // Once we have a token, render the WebView with token injection.
  const injectScript = `
    window.localStorage.setItem('auth_token', '${token}');
    true;
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://assignment-signup-dovt.vercel.app' }}
        javaScriptEnabled
        injectedJavaScriptBeforeContentLoaded={injectScript}
        style={styles.webview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  webview: { flex: 1 },
});
