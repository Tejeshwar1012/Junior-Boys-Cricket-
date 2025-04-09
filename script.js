const { createClient } = supabase;

const supabaseUrl = 'https://pqikdkifazbtrunyhdbw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxaWtka2lmYXpidHJ1bnloZGJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxOTI2OTcsImV4cCI6MjA1OTc2ODY5N30.EdLHhxNZ-Tk3UO9dxVmRG_TNe5MwDTXgKwIgrSVytqI';
const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById('submit-btn').addEventListener('click', async () => {
    const password = document.getElementById('admin-password').value;
    const playerName = document.getElementById('player-name').value;
    const playerScore = document.getElementById('player-score').value;

    if (password === 'your-secure-password') {
        const { data, error } = await supabase
            .from('players')
            .upsert([{ name: playerName, score: playerScore }]);

        if (error) {
            console.error('Error:', error);
        } else {
            loadPlayerStats();
        }
    } else {
        alert('Incorrect password!');
    }
});

async function loadPlayerStats() {
    const { data, error } = await supabase
        .from('players')
        .select('*');

    const tableBody = document.getElementById('stats-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    data.forEach(player => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = player.name;
        row.insertCell(1).innerText = player.score;
    });
}

loadPlayerStats();
