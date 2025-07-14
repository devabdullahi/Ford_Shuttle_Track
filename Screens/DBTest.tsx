import React, { useState, useEffect } from 'react';
import {app} from '../firebase'
import {updateDoc, getFirestore, doc, setDoc, collection} from 'firebase/firestore';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  // You might need Platform or other imports depending on further styling
} from 'react-native';

const db = getFirestore(app);

const DBTestScreen = () => {
    async function sendData(collectionEntry){
        const docRef = doc(db, "bus_locations", "7KE1TzMHdqpLSEH9aQKo");
        await updateDoc(docRef, {
            lat: collectionEntry.lat,
            long: collectionEntry.long,
            building_name: collectionEntry.building_name,
            address: collectionEntry.address,
            timestamp: Date.now()
        });
    };
    
    const collectionArr = [{lat: 42.30, long: -83.23, building_name: "World Headquarters", address: "1 American Rd. Dearborn, 48126"}, {lat: 48.31, long: -83.24, building_name: "Wagner Place", address: "22001 Michigan Ave. Dearborn, 48121"}, {lat: 48.28, long: -83.19, building_name: "Allen Park Test Lab", address: "1500 Enterprise Dr. Allen Park, 48101"}, {lat: 42.30, long: -83.24, building_name: "Ford Engineering Lab", address: "21500 Oakwood Blvd. Dearborn, 48124"}]
    let arrIndex = 0;

    useEffect(() => {
        const updateInterval = setInterval(() => {
            console.log("interval triggered");
            sendData(collectionArr[arrIndex])
            arrIndex++;
            if(arrIndex > 3){
                arrIndex = 0;
            }
        }, 30000);

        console.log("useEffect happened");

        return () => {
            clearInterval(updateInterval)
        };
    }, [collectionArr, arrIndex]);

    return(
        <TouchableOpacity style={styles.navItem} onPress={() => console.log("button pressed")}>
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
    )
}

const circleSize = 28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f8',
  },

  banner: {
    backgroundColor: '#003366',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  bannerSmall: {
    color: 'white',
    fontSize: 18,
    marginBottom: 6,
    fontWeight: '500',
  },

  bannerLarge: {
    color: 'white',
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 6,
  },

  bannerRoute: {
    color: 'white',
    fontSize: 16,
  },

  section: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },

  timeline: {
    borderLeftWidth: 2,
    borderLeftColor: '#ddd',
  },

  timelineItem: {
    flexDirection: 'row',
    marginBottom: 30,
    position: 'relative',
    minHeight: circleSize,
  },

  timelineLeft: {
    width: 50,
    alignItems: 'center',
  },

  line: {
    position: 'absolute',
    top: circleSize,
    left: '50%',
    width: 2,
    height: 50,
    backgroundColor: '#ddd',
  },

  iconCircle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconText: {
    fontSize: 18,
    color: 'white',
  },

  greyCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#bbb',
  },

  timelineRight: {
    flex: 1,
    paddingLeft: 10,
  },

  stopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  stopTitle: {
    fontSize: 16,
    fontWeight: '700',
  },

  completedText: {
    color: '#999',
  },

  upcomingText: {
    color: '#999',
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  completedBadge: {
    backgroundColor: '#e0e0e0',
  },

  currentBadge: {
    backgroundColor: '#003366',
  },

  nextBadge: {
    backgroundColor: '#0066cc',
  },

  upcomingBadge: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  statusBadgeText: {
    fontWeight: '600',
    fontSize: 12,
    color: 'white',
  },

  upcomingBadgeText: {
    color: '#888',
  },

  timeLabel: {
    fontSize: 14,
  },

  completedTimeLabel: {
    color: '#999',
  },

  upcomingTimeLabel: {
    color: '#999',
  },

  currentTimeLabel: {
    color: '#003366',
  },

  nextTimeLabel: {
    color: '#0066cc',
  },

  detailsCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },

  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  detailsTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  onTimeBadge: {
    backgroundColor: '#daf6dc',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  onTimeText: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 14,
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  detailsColumn: {
    flex: 1,
  },

  detailsLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },

  detailsValue: {
    fontWeight: '700',
    fontSize: 16,
  },

  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },

  quickActionButton: {
    backgroundColor: '#e6f0ff',
    borderRadius: 12,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  quickActionIcon: {
    fontSize: 28,
    marginBottom: 6,
  },

  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#003366',
  },

  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },

  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  navIcon: {
    fontSize: 24,
    marginBottom: 2,
  },

  navText: {
    fontSize: 12,
    color: '#333',
  },
});

export default DBTestScreen;