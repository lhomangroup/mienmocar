import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Search, X, MessageCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Conversation } from '@/types/ride';
import { formatRelativeTime } from '@/utils/date';

// Demo data for conversations
const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [
      {
        id: 'user1',
        name: 'Thomas Lefebvre',
        avatarUrl: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.5,
        reviewCount: 8,
        verified: true,
        joinDate: '2023-05-20T10:30:00Z',
      },
      {
        id: 'driver1',
        name: 'Marie Dubois',
        avatarUrl: 'https://images.pexels.com/photos/5199158/pexels-photo-5199158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.8,
        reviewCount: 132,
        verified: true,
        joinDate: '2022-01-15T10:30:00Z',
      }
    ],
    lastMessage: {
      id: 'msg1',
      sender: {
        id: 'driver1',
        name: 'Marie Dubois',
        avatarUrl: 'https://images.pexels.com/photos/5199158/pexels-photo-5199158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.8,
        reviewCount: 132,
        verified: true,
        joinDate: '2022-01-15T10:30:00Z',
      },
      receiver: {
        id: 'user1',
        name: 'Thomas Lefebvre',
        avatarUrl: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.5,
        reviewCount: 8,
        verified: true,
        joinDate: '2023-05-20T10:30:00Z',
      },
      content: 'Je serai à l\'heure de départ, pas d\'inquiétude. Vous pouvez apporter un petit sac à dos.',
      timestamp: '2025-05-14T14:30:00Z',
      read: false
    },
    unreadCount: 1
  },
  {
    id: '2',
    participants: [
      {
        id: 'user1',
        name: 'Thomas Lefebvre',
        avatarUrl: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.5,
        reviewCount: 8,
        verified: true,
        joinDate: '2023-05-20T10:30:00Z',
      },
      {
        id: 'driver2',
        name: 'Jean Dupont',
        avatarUrl: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.7,
        reviewCount: 95,
        verified: true,
        joinDate: '2022-02-20T10:30:00Z',
      }
    ],
    lastMessage: {
      id: 'msg2',
      sender: {
        id: 'user1',
        name: 'Thomas Lefebvre',
        avatarUrl: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.5,
        reviewCount: 8,
        verified: true,
        joinDate: '2023-05-20T10:30:00Z',
      },
      receiver: {
        id: 'driver2',
        name: 'Jean Dupont',
        avatarUrl: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.7,
        reviewCount: 95,
        verified: true,
        joinDate: '2022-02-20T10:30:00Z',
      },
      content: 'Pouvez-vous me déposer près de la gare à Toulouse?',
      timestamp: '2025-05-12T09:45:00Z',
      read: true
    },
    unreadCount: 0
  },
  {
    id: '3',
    participants: [
      {
        id: 'user1',
        name: 'Thomas Lefebvre',
        avatarUrl: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.5,
        reviewCount: 8,
        verified: true,
        joinDate: '2023-05-20T10:30:00Z',
      },
      {
        id: 'driver3',
        name: 'Sophie Moreau',
        avatarUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.9,
        reviewCount: 68,
        verified: true,
        joinDate: '2022-03-10T10:30:00Z',
      }
    ],
    lastMessage: {
      id: 'msg3',
      sender: {
        id: 'driver3',
        name: 'Sophie Moreau',
        avatarUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.9,
        reviewCount: 68,
        verified: true,
        joinDate: '2022-03-10T10:30:00Z',
      },
      receiver: {
        id: 'user1',
        name: 'Thomas Lefebvre',
        avatarUrl: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.5,
        reviewCount: 8,
        verified: true,
        joinDate: '2023-05-20T10:30:00Z',
      },
      content: 'Merci pour votre voyage, j\'espère que tout s\'est bien passé!',
      timestamp: '2025-04-06T18:20:00Z',
      read: true
    },
    unreadCount: 0
  }
];

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>(mockConversations);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(conversation => {
        // Get the other participant (not the current user)
        const otherParticipant = conversation.participants.find(p => p.id !== 'user1');
        if (!otherParticipant) return false;
        
        // Check if the name matches the search query
        return otherParticipant.name.toLowerCase().includes(text.toLowerCase());
      });
      
      setFilteredConversations(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredConversations(conversations);
  };

  const getOtherParticipant = (conversation: Conversation) => {
    // In a real app, you would compare with the current user's ID
    return conversation.participants.find(p => p.id !== 'user1');
  };

  const renderItem = ({ item }: { item: Conversation }) => {
    const otherParticipant = getOtherParticipant(item);
    if (!otherParticipant) return null;
    
    return (
      <Pressable
        style={styles.conversationItem}
        onPress={() => router.push({
          pathname: '/conversation',
          params: { id: item.id }
        })}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: otherParticipant.avatarUrl }}
            style={styles.avatar}
          />
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <Text style={styles.participantName}>{otherParticipant.name}</Text>
            <Text style={styles.timestamp}>{formatRelativeTime(item.lastMessage.timestamp)}</Text>
          </View>
          
          <Text 
            style={[
              styles.lastMessage,
              item.unreadCount > 0 ? styles.unreadMessage : null
            ]}
            numberOfLines={2}
          >
            {item.lastMessage.content}
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderEmptyList = () => {
    if (searchQuery) {
      return (
        <View style={styles.emptyContainer}>
          <Search size={60} color={Colors.neutral[300]} />
          <Text style={styles.emptyTitle}>Aucun résultat trouvé</Text>
          <Text style={styles.emptySubtitle}>
            Essayez avec un autre nom ou vérifiez l'orthographe
          </Text>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <MessageCircle size={60} color={Colors.neutral[300]} />
        <Text style={styles.emptyTitle}>Aucun message</Text>
        <Text style={styles.emptySubtitle}>
          Vos conversations avec les conducteurs et passagers apparaîtront ici
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.neutral[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un contact"
            placeholderTextColor={Colors.neutral[400]}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color={Colors.neutral[400]} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredConversations}
        renderItem={renderItem}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadBadge: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: Colors.primary[500],
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  unreadBadgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: Colors.white,
  },
  conversationContent: {
    flex: 1,
    marginLeft: 12,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  participantName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.neutral[800],
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
  lastMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
    lineHeight: 20,
  },
  unreadMessage: {
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[800],
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
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
  },
});