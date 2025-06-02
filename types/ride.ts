export interface RideLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  joinDate: string;
}

export interface Ride {
  id: string;
  driver: User;
  origin: RideLocation;
  destination: RideLocation;
  stops: RideLocation[];
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  carModel: string;
  carImage?: string;
  carColor: string;
  preferences: {
    smoking: boolean;
    pets: boolean;
    music: boolean;
    talking: boolean;
  };
  description: string;
  bookedPassengers: User[];
  created: string;
}

export interface Booking {
  id: string;
  ride: Ride;
  passenger: User;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  bookingDate: string;
  seatsBooked: number;
}

export interface Message {
  id: string;
  sender: User;
  receiver: User;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
}

export interface Review {
  id: string;
  author: User;
  recipient: User;
  ride: Ride;
  rating: number;
  comment: string;
  date: string;
}