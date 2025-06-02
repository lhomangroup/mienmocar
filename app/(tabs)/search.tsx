import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { MapPin, Calendar, ArrowDown, ArrowLeft, ArrowRight, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function SearchScreen() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const popularOrigins = [
    'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Toulouse', 'Nice'
  ];

  const popularDestinations = [
    'Lyon', 'Paris', 'Marseille', 'Nantes', 'Strasbourg', 'Montpellier', 'Rennes'
  ];

  const popularRoutes = [
    { origin: 'Paris', destination: 'Lyon' },
    { origin: 'Paris', destination: 'Bordeaux' },
    { origin: 'Lyon', destination: 'Marseille' },
    { origin: 'Lille', destination: 'Paris' },
  ];

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setShowDatePicker(false);
  };

  const handleSearch = () => {
    if (origin && destination) {
      router.push({
        pathname: '/search-results',
        params: {
          origin,
          destination,
          date: format(date, 'yyyy-MM-dd'),
          passengers: passengers.toString(),
        }
      });
    } else {
      // Show error or validation message
      console.log('Please enter origin and destination');
    }
  };

  const increasePassengers = () => {
    if (passengers < 8) {
      setPassengers(passengers + 1);
    }
  };

  const decreasePassengers = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Rechercher un trajet</Text>
        </View>

        <View style={styles.searchForm}>
          <View style={styles.locationsContainer}>
            <View style={styles.locationInputContainer}>
              <MapPin size={20} color={Colors.primary[500]} />
              <TextInput
                style={styles.locationInput}
                placeholder="D'où partez-vous?"
                placeholderTextColor={Colors.neutral[400]}
                value={origin}
                onChangeText={setOrigin}
              />
              {origin !== '' && (
                <TouchableOpacity onPress={() => setOrigin('')}>
                  <X size={20} color={Colors.neutral[400]} />
                </TouchableOpacity>
              )}
            </View>
            
            <Pressable style={styles.swapButton} onPress={swapLocations}>
              <ArrowDown size={20} color={Colors.white} />
            </Pressable>
            
            <View style={styles.locationInputContainer}>
              <MapPin size={20} color={Colors.accent[500]} />
              <TextInput
                style={styles.locationInput}
                placeholder="Où allez-vous?"
                placeholderTextColor={Colors.neutral[400]}
                value={destination}
                onChangeText={setDestination}
              />
              {destination !== '' && (
                <TouchableOpacity onPress={() => setDestination('')}>
                  <X size={20} color={Colors.neutral[400]} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          <View style={styles.datePassengerContainer}>
            <Pressable
              style={styles.dateContainer}
              onPress={() => setShowDatePicker(!showDatePicker)}
            >
              <Calendar size={20} color={Colors.primary[500]} />
              <Text style={styles.dateText}>
                {format(date, 'EEEE d MMMM', { locale: fr })}
              </Text>
            </Pressable>
            
            <View style={styles.passengersContainer}>
              <TouchableOpacity
                style={[styles.passengerButton, passengers <= 1 && styles.disabledButton]}
                onPress={decreasePassengers}
                disabled={passengers <= 1}
              >
                <Text style={styles.passengerButtonText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.passengersText}>{passengers}</Text>
              
              <TouchableOpacity
                style={[styles.passengerButton, passengers >= 8 && styles.disabledButton]}
                onPress={increasePassengers}
                disabled={passengers >= 8}
              >
                <Text style={styles.passengerButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {showDatePicker && (
            <ScrollView
              horizontal
              style={styles.datePickerContainer}
              showsHorizontalScrollIndicator={false}
            >
              {Array.from({ length: 14 }).map((_, index) => {
                const currentDate = addDays(new Date(), index);
                const isSelected = 
                  format(currentDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
                
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dateOption,
                      isSelected && styles.selectedDateOption
                    ]}
                    onPress={() => handleDateSelect(currentDate)}
                  >
                    <Text
                      style={[
                        styles.dateOptionDay,
                        isSelected && styles.selectedDateOptionText
                      ]}
                    >
                      {format(currentDate, 'EEE', { locale: fr })}
                    </Text>
                    <Text
                      style={[
                        styles.dateOptionDate,
                        isSelected && styles.selectedDateOptionText
                      ]}
                    >
                      {format(currentDate, 'd', { locale: fr })}
                    </Text>
                    <Text
                      style={[
                        styles.dateOptionMonth,
                        isSelected && styles.selectedDateOptionText
                      ]}
                    >
                      {format(currentDate, 'MMM', { locale: fr })}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
          
          <Pressable
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Text style={styles.searchButtonText}>Rechercher</Text>
          </Pressable>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Destinations populaires</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.popularItemsScroll}
            >
              {popularRoutes.map((route, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.popularRouteItem}
                  onPress={() => {
                    setOrigin(route.origin);
                    setDestination(route.destination);
                  }}
                >
                  <View style={styles.popularRouteContent}>
                    <Text style={styles.popularRouteOrigin}>{route.origin}</Text>
                    <ArrowRight size={16} color={Colors.neutral[400]} />
                    <Text style={styles.popularRouteDestination}>{route.destination}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Villes de départ populaires</Text>
            <View style={styles.popularItemsGrid}>
              {popularOrigins.map((city, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.popularItem}
                  onPress={() => setOrigin(city)}
                >
                  <Text style={styles.popularItemText}>{city}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Villes d'arrivée populaires</Text>
            <View style={styles.popularItemsGrid}>
              {popularDestinations.map((city, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.popularItem}
                  onPress={() => setDestination(city)}
                >
                  <Text style={styles.popularItemText}>{city}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
  },
  searchForm: {
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  locationsContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 56,
    marginBottom: 12,
    backgroundColor: Colors.white,
  },
  locationInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  swapButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -20,
    backgroundColor: Colors.primary[500],
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    transform: [{ rotate: '90deg' }],
  },
  datePassengerContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dateContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 56,
    marginRight: 8,
    backgroundColor: Colors.white,
  },
  dateText: {
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  passengersContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 56,
    backgroundColor: Colors.white,
  },
  passengerButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.neutral[300],
  },
  passengerButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.white,
  },
  passengersText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  datePickerContainer: {
    marginBottom: 16,
  },
  dateOption: {
    width: 68,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  selectedDateOption: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
  },
  dateOptionDay: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.neutral[600],
    textTransform: 'capitalize',
  },
  dateOptionDate: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.neutral[800],
    marginVertical: 2,
  },
  dateOptionMonth: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.neutral[600],
    textTransform: 'capitalize',
  },
  selectedDateOptionText: {
    color: Colors.white,
  },
  searchButton: {
    backgroundColor: Colors.primary[500],
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  searchButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: 16,
  },
  popularItemsScroll: {
    marginLeft: -8,
  },
  popularRouteItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  popularRouteContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularRouteOrigin: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  popularRouteDestination: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  popularItemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
    marginVertical: -4,
  },
  popularItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  popularItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[800],
  },
});