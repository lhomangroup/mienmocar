import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { MapPin, Clock, Calendar, ChevronRight, ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Booking } from '@/types/ride';
import { formatDate, formatTime } from '@/utils/date';

// Demo bookings data
const mockBookings: Booking[] = [
  {
    id: '1',
    ride: {
      id: '101',
      driver: {
        id: 'driver101',
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
      departureTime: '2025-05-20T08:30:00Z',
      arrivalTime: '2025-05-20T12:00:00Z',
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
    passenger: {
      id: 'user1',
      name: 'Thomas Lefebvre',
      avatarUrl: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.5,
      reviewCount: 8,
      verified: true,
      joinDate: '2023-05-20T10:30:00Z',
    },
    status: 'confirmed',
    bookingDate: '2025-04-10T15:45:00Z',
    seatsBooked: 1
  },
  {
    id: '2',
    ride: {
      id: '102',
      driver: {
        id: 'driver102',
        name: 'Jean Dupont',
        avatarUrl: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.7,
        reviewCount: 95,
        verified: true,
        joinDate: '2022-02-20T10:30:00Z',
      },
      origin: {
        id: 'bordeaux',
        name: 'Bordeaux',
        address: 'Bordeaux, France',
        latitude: 44.8378,
        longitude: -0.5792,
      },
      destination: {
        id: 'toulouse',
        name: 'Toulouse',
        address: 'Toulouse, France',
        latitude: 43.6047,
        longitude: 1.4442,
      },
      stops: [],
      departureTime: '2025-06-10T14:00:00Z',
      arrivalTime: '2025-06-10T17:30:00Z',
      price: 28,
      availableSeats: 1,
      totalSeats: 4,
      carModel: 'Peugeot 308',
      carColor: 'Noir',
      preferences: {
        smoking: false,
        pets: false,
        music: true,
        talking: true,
      },
      description: 'Je fais régulièrement des allers-retours entre Bordeaux et Toulouse pour voir ma famille.',
      bookedPassengers: [],
      created: '2025-05-01T09:15:00Z',
    },
    passenger: {
      id: 'user1',
      name: 'Thomas Lefebvre',
      avatarUrl: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.5,
      reviewCount: 8,
      verified: true,
      joinDate: '2023-05-20T10:30:00Z',
    },
    status: 'pending',
    bookingDate: '2025-05-30T11:23:00Z',
    seatsBooked: 1
  },
  {
    id: '3',
    ride: {
      id: '103',
      driver: {
        id: 'driver103',
        name: 'Sophie Moreau',
        avatarUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.9,
        reviewCount: 68,
        verified: true,
        joinDate: '2022-03-10T10:30:00Z',
      },
      origin: {
        id: 'paris',
        name: 'Paris',
        address: 'Paris, France',
        latitude: 48.8566,
        longitude: 2.3522,
      },
      destination: {
        id: 'lille',
        name: 'Lille',
        address: 'Lille, France',
        latitude: 50.6292,
        longitude: 3.0573,
      },
      stops: [],
      departureTime: '2025-04-05T09:00:00Z',
      arrivalTime: '2025-04-05T11:30:00Z',
      price: 25,
      availableSeats: 3,
      totalSeats: 4,
      carModel: 'Citroën C3',
      carColor: 'Bleu',
      preferences: {
        smoking: false,
        pets: true,
        music: false,
        talking: false,
      },
      description: 'Trajet calme, parfait pour travailler ou se reposer.',
      bookedPassengers: [],
      created: '2025-03-20T14:45:00Z',
    },
    passenger: {
      id: 'user1',
      name: 'Thomas Lefebvre',
      avatarUrl: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.5,
      reviewCount: 8,
      verified: true,
      joinDate: '2023-05-20T10:30:00Z',
    },
    status: 'completed',
    bookingDate: '2025-03-25T08:30:00Z',
    seatsBooked: 1
  }
];

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  const upcomingBookings = mockBookings.filter(
    booking => ['confirmed', 'pending'].includes(booking.status)
  );
  
  const pastBookings = mockBookings.filter(
    booking => ['completed', 'cancelled'].includes(booking.status)
  );

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmé';
      case 'pending':
        return 'En attente';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return Colors.success[500];
      case 'pending':
        return Colors.warning[500];
      case 'completed':
        return Colors.neutral[500];
      case 'cancelled':
        return Colors.error[500];
      default:
        return Colors.neutral[500];
    }
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <Pressable
      style={styles.bookingCard}
      onPress={() => router.push({ pathname: '/booking-details', params: { id: item.id } })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.dateContainer}>
          <Calendar size={16} color={Colors.primary[500]} />
          <Text style={styles.dateText}>{formatDate(item.ride.departureTime)}</Text>
        </View>
        <View 
          style={[
            styles.statusTag, 
            { backgroundColor: `${getStatusColor(item.status)}20` }
          ]}
        >
          <Text 
            style={[
              styles.statusText, 
              { color: getStatusColor(item.status) }
            ]}
          >
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.timeLocationContainer}>
          <Text style={styles.timeText}>{formatTime(item.ride.departureTime)}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={Colors.primary[500]} style={styles.locationIcon} />
            <Text style={styles.locationText} numberOfLines={1}>
              {item.ride.origin.name}
            </Text>
          </View>
        </View>
        
        <View style={styles.routeLine}>
          <View style={styles.routeDot} />
          <View style={styles.routeLineMiddle} />
          <View style={styles.routeDot} />
        </View>
        
        <View style={styles.timeLocationContainer}>
          <Text style={styles.timeText}>{formatTime(item.ride.arrivalTime)}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={Colors.accent[500]} style={styles.locationIcon} />
            <Text style={styles.locationText} numberOfLines={1}>
              {item.ride.destination.name}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.driverInfo}>
        <Image
          source={{ uri: item.ride.driver.avatarUrl }}
          style={styles.driverAvatar}
        />
        <View style={styles.driverTextContainer}>
          <Text style={styles.driverName}>
            Conducteur: {item.ride.driver.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.ride.driver.rating}</Text>
            <Text style={styles.ratingStars}>★</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{item.ride.price} €</Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.carInfo}>
          <Text style={styles.carText}>
            {item.ride.carModel} • {item.ride.carColor}
          </Text>
        </View>
        <View style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Détails</Text>
          <ChevronRight size={16} color={Colors.primary[500]} />
        </View>
      </View>
    </Pressable>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Calendar size={60} color={Colors.neutral[300]} />
      <Text style={styles.emptyTitle}>
        {activeTab === 'upcoming' 
          ? 'Aucune réservation à venir' 
          : 'Aucun voyage passé'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {activeTab === 'upcoming' 
          ? 'Trouvez un trajet qui vous convient' 
          : 'Vos voyages terminés apparaîtront ici'}
      </Text>
      {activeTab === 'upcoming' && (
        <TouchableOpacity
          style={styles.findRideButton}
          onPress={() => router.push('/(tabs)/search')}
        >
          <Text style={styles.findRideButtonText}>Trouver un trajet</Text>
          <ArrowRight size={16} color={Colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes réservations</Text>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'upcoming' && styles.activeTabText
              ]}
            >
              À venir
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'past' && styles.activeTab]}
            onPress={() => setActiveTab('past')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'past' && styles.activeTabText
              ]}
            >
              Passés
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={activeTab === 'upcoming' ? upcomingBookings : pastBookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.neutral[800],
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.white,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  activeTabText: {
    color: Colors.neutral[800],
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  bookingCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginLeft: 6,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
    paddingBottom: 16,
  },
  timeLocationContainer: {
    flex: 1,
  },
  timeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  routeLine: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
  routeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary[500],
  },
  routeLineMiddle: {
    width: 1,
    height: 20,
    backgroundColor: Colors.primary[300],
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  driverTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  driverName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  ratingContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
    alignItems: 'center',
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
  priceContainer: {
    backgroundColor: Colors.primary[50],
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.primary[600],
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[500],
    marginRight: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 48,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
    marginBottom: 24,
  },
  findRideButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary[500],
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  findRideButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.white,
    marginRight: 8,
  },
});