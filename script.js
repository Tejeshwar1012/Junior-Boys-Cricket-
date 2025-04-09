const { createClient } = supabase;

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
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
