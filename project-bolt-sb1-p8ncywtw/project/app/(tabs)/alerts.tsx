import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Bell,
  Mail,
  MessageCircle,
  Smartphone,
  Clock,
  ChevronRight,
  Settings,
} from 'lucide-react-native';

interface NotificationChannel {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
}

interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface NotificationHistory {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export default function AlertsScreen() {
  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: 'push',
      name: 'Push Notifications',
      icon: <Bell size={24} color="#007AFF" />,
      enabled: true,
    },
    {
      id: 'email',
      name: 'Email Notifications',
      icon: <Mail size={24} color="#FF9500" />,
      enabled: true,
    },
    {
      id: 'sms',
      name: 'SMS Notifications',
      icon: <MessageCircle size={24} color="#34C759" />,
      enabled: false,
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Notifications',
      icon: <Smartphone size={24} color="#5856D6" />,
      enabled: true,
    },
  ]);

  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'jobs',
      title: 'New Job Matches',
      description: 'Get notified when new jobs match your preferences',
      enabled: true,
    },
    {
      id: 'applications',
      title: 'Application Updates',
      description: 'Receive updates about your job applications',
      enabled: true,
    },
    {
      id: 'messages',
      title: 'New Messages',
      description: 'Get notified when you receive new messages',
      enabled: true,
    },
    {
      id: 'community',
      title: 'Community Activity',
      description: 'Stay updated with community discussions',
      enabled: false,
    },
  ]);

  const [history] = useState<NotificationHistory[]>([
    {
      id: '1',
      title: 'New Job Match',
      description: 'Senior Frontend Developer position at TechCorp matches your profile',
      timestamp: '2h ago',
      read: false,
    },
    {
      id: '2',
      title: 'Application Update',
      description: 'Your application for Product Designer at Creative Studios has been viewed',
      timestamp: '4h ago',
      read: true,
    },
    {
      id: '3',
      title: 'Community Message',
      description: 'Sarah Chen commented on your discussion about career transition',
      timestamp: '1d ago',
      read: true,
    },
  ]);

  const toggleChannel = (channelId: string) => {
    setChannels(channels.map(channel =>
      channel.id === channelId
        ? { ...channel, enabled: !channel.enabled }
        : channel
    ));
  };

  const togglePreference = (preferenceId: string) => {
    setPreferences(preferences.map(pref =>
      pref.id === preferenceId
        ? { ...pref, enabled: !pref.enabled }
        : pref
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Text style={styles.headerSubtitle}>Manage your alert preferences</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Notification Channels</Text>
          </View>
          {channels.map(channel => (
            <View key={channel.id} style={styles.channelItem}>
              <View style={styles.channelInfo}>
                {channel.icon}
                <Text style={styles.channelName}>{channel.name}</Text>
              </View>
              <Switch
                value={channel.enabled}
                onValueChange={() => toggleChannel(channel.id)}
                trackColor={{ false: '#e1e1e1', true: '#34C759' }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Notification Preferences</Text>
          </View>
          {preferences.map(pref => (
            <View key={pref.id} style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Text style={styles.preferenceTitle}>{pref.title}</Text>
                <Text style={styles.preferenceDescription}>{pref.description}</Text>
              </View>
              <Switch
                value={pref.enabled}
                onValueChange={() => togglePreference(pref.id)}
                trackColor={{ false: '#e1e1e1', true: '#34C759' }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notifications</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
          {history.map(notification => (
            <View
              key={notification.id}
              style={[
                styles.notificationItem,
                !notification.read && styles.unreadNotification,
              ]}>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationDescription}>
                  {notification.description}
                </Text>
                <View style={styles.notificationMeta}>
                  <Clock size={16} color="#666" />
                  <Text style={styles.notificationTime}>{notification.timestamp}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.advancedSettings}>
          <Settings size={20} color="#007AFF" />
          <Text style={styles.advancedSettingsText}>Advanced Settings</Text>
          <ChevronRight size={20} color="#007AFF" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'web' ? 20 : 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelName: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1a1a1a',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  preferenceInfo: {
    flex: 1,
    marginRight: 16,
  },
  preferenceTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#007AFF',
    marginRight: 4,
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  unreadNotification: {
    backgroundColor: '#f0f7ff',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 8,
  },
  notificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTime: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  advancedSettings: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  advancedSettingsText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#007AFF',
  },
});