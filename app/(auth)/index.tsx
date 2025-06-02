import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function WelcomeScreen() {
  useEffect(() => {
    // Simulating auto-login for demo purposes
    // In real app, check token validity here
    const timer = setTimeout(() => {
      // Uncommenting this would auto-navigate to the main app after 2 seconds
      // router.replace('/(tabs)');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={[Colors.primary[700], Colors.primary[500]]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>MienmoCar</Text>
          <Text style={styles.tagline}>Voyagez ensemble, économisez ensemble</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => router.push('/(auth)/signin')}
          >
            <Text style={styles.buttonText}>Connexion</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.outlineButton]}
            onPress={() => router.push('/(auth)/signup')}
          >
            <Text style={[styles.buttonText, styles.outlineButtonText]}>Inscription</Text>
          </Pressable>

          <Pressable
            style={styles.skipButton}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.skipButtonText}>Explorer l'application</Text>
            <ArrowRight size={16} color={Colors.white} />
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 120,
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  logoText: {
    marginTop: 24,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 36,
    color: Colors.white,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  button: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.primary[600],
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  outlineButtonText: {
    color: Colors.white,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  skipButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.white,
    marginRight: 8,
  },
});