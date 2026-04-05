// js/data-service.js
// Funciona com localStorage AGORA, Firebase DEPOIS

const DataService = {
    // Config: mude para 'firebase' quando configurar
    mode: 'localStorage', // ou 'firebase'
    
    // ===== LOCALSTORAGE (funciona já) =====
    async getUser(id) {
        if (this.mode === 'firebase') return this._firebaseGetUser(id);
        const users = JSON.parse(localStorage.getItem('ep_users') || '[]');
        return users.find(u => u.id === id) || null;
    },
    
    async saveProgress(userId, unitId, skill, completed) {
        if (this.mode === 'firebase') return this._firebaseSaveProgress(userId, unitId, skill, completed);
        
        const key = `ep_progress_${userId}`;
        const progress = JSON.parse(localStorage.getItem(key) || '{}');
        progress[`${unitId}_${skill}`] = { completed, date: new Date().toISOString() };
        localStorage.setItem(key, JSON.stringify(progress));
        return true;
    },
    
    async getUnits(level) {
        if (this.mode === 'firebase') return this._firebaseGetUnits(level);
        // Carrega do JSON local
        const res = await fetch('data/units-a1.json');
        return await res.json();
    },
    
    // ===== FIREBASE (descomente quando configurar) =====
    /*
    async _firebaseGetUser(id) {
        const { getFirestore, doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js');
        const db = getFirestore();
        const snap = await getDoc(doc(db, 'users', id));
        return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    }
    // ... outros métodos Firebase
    */
};
