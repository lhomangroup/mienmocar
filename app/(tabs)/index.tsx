import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Image, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { MapPin, Clock, Car, Users, ChevronRight, Bell } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { Ride } from '@/types/ride';
import { formatDate, formatTime } from '@/utils/date';

// Demo rides data
const popularRides: Ride[] = [
  {
    id: '1',
    driver: {
      id: 'driver1',
      name: 'Marie Dubois',
      avatarUrl: 'https://images.pexels.com/photos/5199158/pexels-photo-5199158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.8,
      reviewCount: 132,
      verified: true,
      joinDate: '2022-01-15T10:30:00Z',
    },
    origin: {
      id: 'paris',
      name: 'Paris',
      address: 'Paris, France',
      latitude: 48.8566,
      longitude: 2.3522,
    },
    destination: {
      id: 'lyon',
      name: 'Lyon',
      address: 'Lyon, France',
      latitude: 45.7578,
      longitude: 4.8320,
    },
    stops: [],
    departureTime: '2025-05-15T08:30:00Z',
    arrivalTime: '2025-05-15T12:00:00Z',
    price: 32,
    availableSeats: 2,
    totalSeats: 3,
    carModel: 'Renault Clio',
    carColor: 'Rouge',
    preferences: {
      smoking: false,
      pets: true,
      music: true,
      talking: true,
    },
    description: 'Voyage régulier vers Lyon pour le travail. Je pars de Gare de Lyon.',
    bookedPassengers: [],
    created: '2025-04-01T14:23:00Z',
  },
  {
    id: '2',
    driver: {
      id: 'driver2',
      name: 'Thomas Martin',
      avatarUrl: 'https://images.pexels.com/photos/895265/pexels-photo-895265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.6,
      reviewCount: 84,
      verified: true,
      joinDate: '2022-03-20T10:30:00Z',
    },
    origin: {
      id: 'paris',
      name: 'Paris',
      address: 'Paris, France',
      latitude: 48.8566,
      longitude: 2.3522,
    },
    destination: {
      id: 'bordeaux',
      name: 'Bordeaux',
      address: 'Bordeaux, France',
      latitude: 44.8378,
      longitude: -0.5792,
    },
    stops: [
      {
        id: 'orleans',
        name: 'Orléans',
        address: 'Orléans, France',
        latitude: 47.9029,
        longitude: 1.9046,
      }
    ],
    departureTime: '2025-05-16T14:00:00Z',
    arrivalTime: '2025-05-16T19:30:00Z',
    price: 45,
    availableSeats: 3,
    totalSeats: 4,
    carModel: 'Peugeot 3008',
    carColor: 'Gris',
    preferences: {
      smoking: false,
      pets: false,
      music: true,
      talking: true,
    },
    description: 'Voyage pour le weekend. Départ près de la Tour Eiffel. Petits bagages uniquement.',
    bookedPassengers: [],
    created: '2025-04-03T09:15:00Z',
  },
  {
    id: '3',
    driver: {
      id: 'driver3',
      name: 'Sophie Leroy',
      avatarUrl: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.9,
      reviewCount: 215,
      verified: true,
      joinDate: '2022-02-10T10:30:00Z',
    },
    origin: {
      id: 'marseille',
      name: 'Marseille',
      address: 'Marseille, France',
      latitude: 43.2965,
      longitude: 5.3698,
    },
    destination: {
      id: 'nice',
      name: 'Nice',
      address: 'Nice, France',
      latitude: 43.7102,
      longitude: 7.2620,
    },
    stops: [],
    departureTime: '2025-05-17T09:00:00Z',
    arrivalTime: '2025-05-17T11:30:00Z',
    price: 25,
    availableSeats: 1,
    totalSeats: 4,
    carModel: 'Citroën C4',
    carColor: 'Bleu',
    preferences: {
      smoking: false,
      pets: true,
      music: true,
      talking: false,
    },
    description: 'Trajet côtier avec vue sur la mer. Ambiance calme, idéal pour travailler ou se reposer.',
    bookedPassengers: [],
    created: '2025-04-02T11:45:00Z',
  }
];

const recentSearches = [
  { id: '1', origin: 'Paris', destination: 'Lyon', date: '2025-05-15' },
  { id: '2', origin: 'Marseille', destination: 'Nice', date: '2025-05-20' },
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [rides, setRides] = useState<Ride[]>(popularRides);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // In a real app, fetch rides from API here
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    
    // Simulate API fetch
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary[500]}
            colors={[Colors.primary[500]]}
          />
        }
      >
        <View style={styles.header}>
          <LinearGradient
            colors={[Colors.primary[600], Colors.primary[400]]}
            style={styles.headerBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.greeting}>Bonjour 👋</Text>
                <Text style={styles.username}>Utilisateur</Text>
              </View>
              
              <Pressable
                style={styles.notificationButton}
                onPress={() => router.push('/notifications')}
              >
                <Bell size={24} color={Colors.white} />
              </Pressable>
            </View>
            
            <Pressable
              style={styles.searchBox}
              onPress={() => router.push('/(tabs)/search')}
            >
              <Text style={styles.searchPlaceholder}>Où allez-vous?</Text>
              <Search size={20} color={Colors.neutral[400]} />
            </Pressable>
          </View>
        </View>
        
        {recentSearches.length > 0 && (
          <View style={styles.recentSearches}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recherches récentes</Text>
              <Pressable onPress={() => console.log('Clear recent searches')}>
                <Text style={styles.clearText}>Effacer</Text>
              </Pressable>
            </View>
            
            {recentSearches.map((search) => (
              <Pressable 
                key={search.id} 
                style={styles.recentSearchItem}
                onPress={() => router.push({
                  pathname: '/(tabs)/search',
                  params: { 
                    origin: search.origin, 
                    destination: search.destination,
                    date: search.date
                  }
                })}
              >
                <MapPin size={16} color={Colors.neutral[500]} />
                <View style={styles.recentSearchText}>
                  <Text style={styles.recentSearchRoute}>
                    {search.origin} → {search.destination}
                  </Text>
                  <Text style={styles.recentSearchDate}>
                    {formatDate(search.date)}
                  </Text>
                </View>
                <ChevronRight size={16} color={Colors.neutral[400]} />
              </Pressable>
            ))}
          </View>
        )}
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trajets populaires</Text>
            <Pressable onPress={() => router.push('/(tabs)/search')}>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </Pressable>
          </View>
          
          <View style={styles.ridesContainer}>
            {rides.map((ride) => (
              <Pressable 
                key={ride.id} 
                style={styles.rideCard}
                onPress={() => router.push({
                  pathname: '/ride-details',
                  params: { id: ride.id }
                })}
              >
                <View style={styles.routeInfo}>
                  <Text style={styles.time}>
                    {formatTime(ride.departureTime)}
                  </Text>
                  <Text style={styles.location}>
                    {ride.origin.name}
                  </Text>
                </View>
                
                <View style={styles.routeConnector}>
                  <View style={styles.routeConnectorLine} />
                </View>
                
                <View style={styles.routeInfo}>
                  <Text style={styles.time}>
                    {formatTime(ride.arrivalTime)}
                  </Text>
                  <Text style={styles.location}>
                    {ride.destination.name}
                  </Text>
                </View>
                
                <View style={styles.priceTag}>
                  <Text style={styles.price}>{ride.price} €</Text>
                </View>
                
                <View style={styles.rideCardFooter}>
                  <View style={styles.driverInfo}>
                    <Image
                      source={{ uri: ride.driver.avatarUrl }}
                      style={styles.driverAvatar}
                    />
                    <Text style={styles.driverName}>{ride.driver.name}</Text>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.ratingText}>{ride.driver.rating}</Text>
                      <Text style={styles.ratingStars}>★</Text>
                    </View>
                  </View>
                  
                  <View style={styles.rideDetails}>
                    <View style={styles.rideDetail}>
                      <Car size={14} color={Colors.neutral[500]} />
                      <Text style={styles.rideDetailText}>{ride.carModel}</Text>
                    </View>
                    <View style={styles.rideDetail}>
                      <Users size={14} color={Colors.neutral[500]} />
                      <Text style={styles.rideDetailText}>{ride.availableSeats} places</Text>
                    </View>
                    <View style={styles.rideDetail}>
                      <Clock size={14} color={Colors.neutral[500]} />
                      <Text style={styles.rideDetailText}>{formatDate(ride.departureTime, 'dd MMM')}</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.offerRideCard}>
            <View style={styles.offerRideContent}>
              <Car size={40} color={Colors.primary[500]} />
              <View style={styles.offerRideTextContainer}>
                <Text style={styles.offerRideTitle}>Vous avez des places libres?</Text>
                <Text style={styles.offerRideDescription}>
                  Publiez votre trajet et économisez sur vos frais de voyage
                </Text>
              </View>
            </View>
            
            <Pressable
              style={styles.offerRideButton}
              onPress={() => router.push('/create-ride')}
            >
              <Text style={styles.offerRideButtonText}>Proposer un trajet</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const Search = ({ size, color }: { size: number, color: string }) => (
  <View style={styles.searchIcon}>
    <MapPin size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    position: 'relative',
    minHeight: 200,
    width: '100%',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
  },
  username: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.white,
  },
  notificationButton: {
    height: 42,
    width: 42,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    height: 56,
    backgroundColor: Colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchPlaceholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[500],
  },
  searchIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentSearches: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 24,
    marginTop: 24,
    padding: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.neutral[800],
  },
  clearText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[500],
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[500],
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  recentSearchText: {
    flex: 1,
    marginLeft: 12,
  },
  recentSearchRoute: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: Colors.neutral[800],
  },
  recentSearchDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: Colors.neutral[500],
    marginTop: 2,
  },
  section: {
    marginTop: 24,
    marginHorizontal: 24,
  },
  ridesContainer: {
    marginTop: 8,
  },
  rideCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  time: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.neutral[800],
    width: 50,
  },
  location: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
    marginLeft: 12,
  },
  routeConnector: {
    paddingLeft: 25,
    marginVertical: 4,
  },
  routeConnectorLine: {
    width: 2,
    height: 20,
    backgroundColor: Colors.primary[300],
  },
  priceTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: Colors.primary[50],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.primary[600],
  },
  rideCardFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[100],
    marginTop: 16,
    paddingTop: 12,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  driverName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[800],
    marginLeft: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.neutral[800],
  },
  ratingStars: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.accent[500],
    marginLeft: 2,
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rideDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideDetailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: Colors.neutral[600],
    marginLeft: 4,
  },
  offerRideCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  offerRideContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerRideTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  offerRideTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  offerRideDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  offerRideButton: {
    backgroundColor: Colors.primary[500],
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  offerRideButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.white,
  },
});