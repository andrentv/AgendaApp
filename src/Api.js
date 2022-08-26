import AsyncStorage from '@react-native-async-storage/async-storage';
import { add } from 'react-native-reanimated';

const BASE_API = 'http://localhost:3333';

export default {
 //auth/refresh
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });
        const json = await req.json();
        return json;
    },
    //auth/refresh
    signIn: async (email, password) => {
    		console.log("URL", `${BASE_API}/users`);
    		console.log("BODY", JSON.stringify({ email, password }));
    		console.log("password", password);
        const req = await fetch(`${BASE_API}/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await req.json();
        return json;
    },
    signUp: async (name, email, password) => {
    		console.log("URL", `${BASE_API}/users`);
    		console.log("BODY", JSON.stringify({ email, password, name }));
    		console.log("password", password);
        const req = await fetch(`${BASE_API}/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await req.json();
        return json;       
    },
    //auth/logout
    logout: async () => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/users`, {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });

        const json = await req.json();
        return json;
    },
    getBarbers: async (lat = null, lng = null, address = null) => {
        const token = await AsyncStorage.getItem('token');

        console.log("LAT", lat);
        console.log("LNG", lng);
        console.log("ADDRESS", address);

        const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
        const json = await req.json();
        return json;
    },
    getBarber: async (id) => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`);
        const json = await req.json();
        return json;

    },
    setFavorite: async (barberId) => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/user/favorite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, barber: barberId })
        });
        const json = await req.json();
        return json;
    },
    setAppointment: async (user, service, selectedYear, selectedMonth, selectedDay, selectedHour) => {

        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/user/appointment`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                id: user.id,
                service,
                year: selectedYear,
                month: selectedMonth,
                day: selectedDay,
                hour: selectedHour
            })
        });
        const json = await req.json();
        return json;
    }
}
