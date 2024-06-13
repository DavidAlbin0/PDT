import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const ProfileScreen = () => {
  // Datos de ejemplo para la cuadrícula de horario
  const scheduleData = [
    { id: '1', day: 'Lunes', time: '9:00 AM - 5:00 PM', room: 'Salon 1' },
    { id: '2', day: 'Martes', time: '9:00 AM - 5:00 PM', room: 'Salon 2' },
    { id: '3', day: 'Miércoles', time: '9:00 AM - 5:00 PM', room: 'Salon 3' },
    { id: '4', day: 'Jueves', time: '9:00 AM - 5:00 PM', room: 'Salon 4' },
    { id: '5', day: 'Viernes', time: '9:00 AM - 5:00 PM', room: 'Salon 5' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // URL de la imagen de perfil
          style={styles.profileImage}
        />
        <Text style={styles.username}>Nombre de Usuario</Text>
        <Text style={styles.email}>correo@electronico.com</Text>
      </View>
      <View style={styles.profileContent}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nombre:</Text>
          <Text style={styles.infoValue}>John Doe</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Edad:</Text>
          <Text style={styles.infoValue}>30 años</Text>
        </View>
        {/* Agrega más detalles de perfil aquí */}
        <Text style={styles.sectionTitle}>Horario</Text>
        <FlatList
          data={scheduleData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.scheduleItem}>
              <Text style={styles.day}>{item.day}</Text>
              <View style={styles.scheduleDetails}>
                <Text style={styles.time}>{item.time}</Text>
                <Text style={styles.room}>{item.room}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  profileContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoValue: {
    flex: 1,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  day: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  scheduleDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    marginRight: 10,
  },
  room: {
    color: '#888',
  },
});

export default ProfileScreen;
