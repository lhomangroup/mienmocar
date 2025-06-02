import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Eye, EyeOff, XCircle, CheckCircle2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignUp = () => {
    let isValid = true;

    if (!name) {
      setNameError('Nom est requis');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email est requis');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Email invalide');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Mot de passe est requis');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Le mot de passe doit comporter au moins 6 caractères');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirmation du mot de passe est requise');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      // In a real app, perform registration API call here
      // For demo, just navigate to main app
      router.replace('/(tabs)');
    }
  };

  // Password requirements indicators
  const hasMinLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

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
          <Text style={styles.title}>Inscription</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nom complet</Text>
            <View style={[styles.inputWrapper, nameError ? styles.inputError : null]}>
              <TextInput
                style={styles.input}
                placeholder="Votre nom"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          </View>

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
                <TouchableOpacity onPress={() => setEmail('')}>
                  <XCircle size={20} color={Colors.neutral[400]} />
                </TouchableOpacity>
              )}
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mot de passe</Text>
            <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
              <TextInput
                style={styles.input}
                placeholder="Créer un mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color={Colors.neutral[400]} />
                ) : (
                  <Eye size={20} color={Colors.neutral[400]} />
                )}
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            
            <View style={styles.passwordRequirements}>
              <View style={styles.requirementItem}>
                <CheckCircle2 size={16} color={hasMinLength ? Colors.success[500] : Colors.neutral[300]} />
                <Text style={[styles.requirementText, hasMinLength && styles.requirementMet]}>
                  6 caractères minimum
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <CheckCircle2 size={16} color={hasUpperCase ? Colors.success[500] : Colors.neutral[300]} />
                <Text style={[styles.requirementText, hasUpperCase && styles.requirementMet]}>
                  Une lettre majuscule
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <CheckCircle2 size={16} color={hasNumber ? Colors.success[500] : Colors.neutral[300]} />
                <Text style={[styles.requirementText, hasNumber && styles.requirementMet]}>
                  Un chiffre
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <CheckCircle2 size={16} color={hasSpecialChar ? Colors.success[500] : Colors.neutral[300]} />
                <Text style={[styles.requirementText, hasSpecialChar && styles.requirementMet]}>
                  Un caractère spécial
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirmer le mot de passe</Text>
            <View style={[styles.inputWrapper, confirmPasswordError ? styles.inputError : null]}>
              <TextInput
                style={styles.input}
                placeholder="Confirmer votre mot de passe"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff size={20} color={Colors.neutral[400]} />
                ) : (
                  <Eye size={20} color={Colors.neutral[400]} />
                )}
              </TouchableOpacity>
            </View>
            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
          </View>

          <Pressable
            style={styles.signUpButton}
            onPress={handleSignUp}
          >
            <Text style={styles.signUpButtonText}>S'inscrire</Text>
          </Pressable>

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Vous avez déjà un compte?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signin')}>
              <Text style={styles.signInLinkText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
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
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
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
  passwordRequirements: {
    marginTop: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  requirementText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginLeft: 8,
  },
  requirementMet: {
    color: Colors.success[500],
  },
  signUpButton: {
    backgroundColor: Colors.primary[500],
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  signUpButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.white,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[600],
  },
  signInLinkText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.primary[500],
    marginLeft: 4,
  },
});