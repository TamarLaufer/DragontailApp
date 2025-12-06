import React, { useEffect } from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { Location } from '../types/locationTypes';
import { LocationCard } from '../components/LocationCard';
import { useIdleDetection } from '../hooks/useIdleDetection';

const HomeScreen = () => {
  const { data, loading, error, stopTracking } = useLocation();
  const { isIdle } = useIdleDetection(data);

  useEffect(() => {
    if (isIdle) {
      stopTracking();
    }
  }, [isIdle, stopTracking]);

  const renderItem = ({ item }: { item: Location }) => (
    <LocationCard location={item} />
  );

  if (loading) {
    return <Text style={styles.center}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.center}>{error}</Text>;
  }

  return (
    <>
      {isIdle && (
        <View style={styles.idleBanner}>
          <Text style={styles.idleText}>⚠️ User is inactive</Text>
        </View>
      )}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },
  idleBanner: {
    backgroundColor: '#ffe4e4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  idleText: {
    color: '#b00020',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
