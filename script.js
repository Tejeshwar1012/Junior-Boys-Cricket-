import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Secure Environment Variables (ONLY YOU SHOULD KNOW THESE)
const SUPABASE_URL = 'https://pqikdkifazbtrunyhdbw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxaWtka2lmYXpidHJ1bnloZGJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxOTI2OTcsImV4cCI6MjA1OTc2ODY5N30.EdLHhxNZ-Tk3UO9dxVmRG_TNe5MwDTXgKwIgrSVytqI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Hidden secure password (admin only - edit in JS, not HTML)
const securePassword = atob("Y3JpY2tldDEyMw=="); // "cricket123" base64 encoded

async function fetchPlayers() {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .order('runs_scored', { ascending: false });

  if (error) {
    console.error('Error fetching:', error);
    return;
  }

  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';
  data.forEach(player => {
    const row = `<tr>
      <td>${player.name}</td>
      <td>${player.matches_played}</td>
      <td>${player.runs_scored}</td>
      <td>${player.wickets_taken}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

window.addPlayer = async function () {
  const password = document.getElementById('adminPassword').value;
  if (password !== securePassword) {
    alert("Invalid password.");
    return;
  }

  const name = document.getElementById('playerName').value.trim();
  const matches = parseInt(document.getElementById('matchesPlayed').value);
  const runs = parseInt(document.getElementById('runsScored').value);
  const wickets = parseInt(document.getElementById('wicketsTaken').value);

  if (!name || isNaN(matches) || isNaN(runs) || isNaN(wickets)) {
    alert("Please fill all fields correctly.");
    return;
  }

  const { error } = await supabase
    .from('players')
    .upsert([
      {
        name,
        matches_played: matches,
        runs_scored: runs,
        wickets_taken: wickets
      }
    ], { onConflict: ['name'] });

  if (error) {
    alert("Error updating stats.");
    console.error(error);
  } else {
    alert("Player stats updated.");
    fetchPlayers();
  }
};

fetchPlayers();
