// src/client.js
import { createClient } from '@supabase/supabase-js';

// Find these in your Supabase project settings -> API
const URL = 'https://ijgihtaauhqgmqprofqk.supabase.co'; // Replace with your Project URL
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZ2lodGFhdWhxZ21xcHJvZnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTIwMTgsImV4cCI6MjA2NTQ4ODAxOH0.Yn0mKlCGx9DnCJ5ttVB1RLZKLFlJWGWozmHa8iaibZA'; // Replace with your Project API Key

export const supabase = createClient(URL, API_KEY);