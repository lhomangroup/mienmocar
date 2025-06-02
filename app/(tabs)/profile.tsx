import { StyleSheet, Text, View, Image, ScrollView, Pressable, Switch, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { User, Star, Shield, Car, MessageCircle, Calendar, CreditCard, Settings, LogOut, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';

// Mock user data
const userData = {
  id: 'user1',
  name: 'Thomas Lefebvre',
  avatarUrl: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  email: 'thomas.lefebvre@example.com',
  phone: '+33 6 12 34 56 78',
  rating: 4.5,
  reviewCount: 8,
  verified: true,
  joinDate: '2023-05-20T10:30:00Z',
  bio: 'Voyageur régulier entre Paris et Lyon. J\'aime les conversations intéressantes pendant les trajets.',
  preferences: {
    smoking: false,
    pets: true,
    music: true,
    talking: true,
  }
};

export default function ProfileScreen() {
  const joinYear = new Date(userData.joinDate).getFullYear();
  
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: userData.avatarUrl }} style={styles.profileImage} />
          </View>
          
          <Text style={styles.userName}>{userData.name}</Text>
          
          <View style={styles.verificationBadge}>
            <Shield size={14} color={Colors.success[500]} />
            <Text style={styles.verificationText}>Identité vérifiée</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color={Colors.accent[500]} />
            <Text style={styles.ratingText}>{userData.rating}</Text>
            <Text style={styles.reviewCount}>({userData.reviewCount} avis)</Text>
          </View>
          
          <Text style={styles.memberSince}>Membre depuis {joinYear}</Text>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => router.push('/edit-profile')}
          >
            <Text style={styles.editButtonText}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>
        
        {userData.bio && (
          <View style={styles.bioSection}>
            <Text style={styles.sectionTitle}>À propos</Text>
            <Text style={styles.bioText}>{userData.bio}</Text>
          </View>
        )}
        
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Préférences de voyage</Text>
          
          <View style={styles.preferencesGrid}>
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Fumeur</Text>
              <Switch
                value={userData.preferences.smoking}
                trackColor={{ false: Colors.neutral[300], true: Colors.primary[300] }}
                thumbColor={userData.preferences.smoking ? Colors.primary[500] : Colors.white}
                onValueChange={() => {}}
              />
            </View>
            
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Animaux</Text>
              <Switch
                value={userData.preferences.pets}
                trackColor={{ false: Colors.neutral[300], true: Colors.primary[300] }}
                thumbColor={userData.preferences.pets ? Colors.primary[500] : Colors.white}
                onValueChange={() => {}}
              />
            </View>
            
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Musique</Text>
              <Switch
                value={userData.preferences.music}
                trackColor={{ false: Colors.neutral[300], true: Colors.primary[300] }}
                thumbColor={userData.preferences.music ? Colors.primary[500] : Colors.white}
                onValueChange={() => {}}
              />
            </View>
            
            <View style={styles.preferenceItem}>
              <Text style={styles.preferenceLabel}>Discussion</Text>
              <Switch
                value={userData.preferences.talking}
                trackColor={{ false: Colors.neutral[300], true: Colors.primary[300] }}
                thumbColor={userData.preferences.talking ? Colors.primary[500] : Colors.white}
                onValueChange={() => {}}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/my-rides')}
          >
            <View style={styles.menuIconContainer}>
              <Car size={20} color={Colors.white} />
            </View>
            <Text style={styles.menuItemText}>Mes trajets proposés</Text>
            <ChevronRight size={20} color={Colors.neutral[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/bookings')}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: Colors.secondary[500] }]}>
              <Calendar size={20} color={Colors.white} />
            </View>
            <Text style={styles.menuItemText}>Mes réservations</Text>
            <ChevronRight size={20} color={Colors.neutral[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(tabs)/messages')}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: Colors.accent[500] }]}>
              <MessageCircle size={20} color={Colors.white} />
            </View>
            <Text style={styles.menuItemText}>Messages</Text>
            <ChevronRight size={20} color={Colors.neutral[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/payment-methods')}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: Colors.success[500] }]}>
              <CreditCard size={20} color={Colors.white} />
            </View>
            <Text style={styles.menuItemText}>Moyens de paiement</Text>
            <ChevronRight size={20} color={Colors.neutral[400]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/settings')}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: Colors.neutral[700] }]}>
              <Settings size={20} color={Colors.white} />
            </View>
            <Text style={styles.menuItemText}>Paramètres</Text>
            <ChevronRight size={20} color={Colors.neutral[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.replace('/(auth)')}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: Colors.error[500] }]}>
              <LogOut size={20} color={Colors.white} />
            </View>
            <Text style={styles.menuItemText}>Déconnexion</Text>
            <ChevronRight size={20} color={Colors.neutral[400]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>MienmoCar v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: Colors.white,
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: Colors.primary[500],
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.neutral[900],
    marginBottom: 8,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  verificationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.success[700],
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginLeft: 4,
  },
  reviewCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginLeft: 4,
  },
  memberSince: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.primary[50],
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[600],
  },
  bioSection: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 24,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: 12,
  },
  bioText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[700],
    lineHeight: 24,
  },
  preferencesSection: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  preferencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  preferenceItem: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  preferenceLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[700],
  },
  menuSection: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[500],
  },
});