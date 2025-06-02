import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, XCircle, CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleResetPassword = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email est requis');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Email invalide');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (isValid) {
      // In a real app, perform password reset API call here
      setIsSubmitted(true);
    }
  };

  const clearEmail = () => {
    setEmail('');
    setEmailError('');
  };

  if (isSubmitted) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.neutral[800]} />
          </TouchableOpacity>
          <Text style={styles.title}>Réinitialisation du mot de passe</Text>
        </View>

        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <CheckCircle size={60} color={Colors.success[500]} />
          </View>
          <Text style={styles.successTitle}>Email envoyé!</Text>
          <Text style={styles.successMessage}>
            Nous avons envoyé un lien de réinitialisation du mot de passe à l'adresse {email}. Veuillez vérifier votre boîte de réception.
          </Text>
          <Text style={styles.successHint}>
            N'oubliez pas de vérifier votre dossier spam si vous ne trouvez pas l'email dans votre boîte de réception.
          </Text>

          <Pressable
            style={styles.returnButton}
            onPress={() => router.push('/(auth)/signin')}
          >
            <Text style={styles.returnButtonText}>Retour à la connexion</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.neutral[800]} />
          </TouchableOpacity>
          <Text style={styles.title}>Mot de passe oublié</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.description}>
            Entrez l'adresse email associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
              <TextInput
                style={styles.input}
                placeholder="Votre email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {email.length > 0 && (
                <TouchableOpacity onPress={clearEmail}>
                  <XCircle size={20} color={Colors.neutral[400]} />
                </TouchableOpacity>
              )}
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          <Pressable
            style={styles.resetButton}
            onPress={handleResetPassword}
          >
            <Text style={styles.resetButtonText}>Réinitialiser le mot de passe</Text>
          </Pressable>

          <TouchableOpacity 
            style={styles.returnLink}
            onPress={() => router.push('/(auth)/signin')}
          >
            <Text style={styles.returnLinkText}>Retour à la connexion</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    minHeight: '100%',
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 28,
    color: Colors.neutral[800],
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[600],
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[700],
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 56,
  },
  inputError: {
    borderColor: Colors.error[500],
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.error[500],
    marginTop: 4,
  },
  resetButton: {
    backgroundColor: Colors.primary[500],
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  resetButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.white,
  },
  returnLink: {
    alignItems: 'center',
  },
  returnLinkText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.primary[500],
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.neutral[800],
    marginBottom: 16,
  },
  successMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
    marginBottom: 16,
  },
  successHint: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[500],
    textAlign: 'center',
    marginBottom: 32,
  },
  returnButton: {
    backgroundColor: Colors.primary[500],
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  returnButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.white,
  },
});