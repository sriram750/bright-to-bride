// Robust dual-storage engine using IndexedDB with fallback to localStorage
// Handles large base64 image strings without hitting localStorage 5MB quota limits.

const DB_NAME = 'bright_to_bride_db';
const DB_VERSION = 1;
const STORE_NAME = 'studio_store';
const DATA_KEY = 'custom_data_v2';
const STORAGE_KEY = 'bright_to_bride_custom_data_v2';

let dbPromise: Promise<IDBDatabase> | null = null;

function initDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      console.warn('IndexedDB failed to open:', (event.target as IDBOpenDBRequest).error);
      reject((event.target as IDBOpenDBRequest).error);
    };
  });

  return dbPromise;
}

export async function saveToStorageEngine(data: any): Promise<boolean> {
  let savedToIDB = false;

  // 1. Try IndexedDB (handles 50MB+ of base64 photos easily)
  try {
    const db = await initDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(data, DATA_KEY);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    savedToIDB = true;
  } catch (err) {
    console.warn('IndexedDB save fallback to localStorage:', err);
  }

  // 2. Backup to localStorage (with error handling for quota)
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.warn('localStorage save warning (quota might be exceeded, rely on IndexedDB):', err);
  }

  return savedToIDB;
}

export async function loadFromStorageEngine(): Promise<any | null> {
  // 1. Try IndexedDB first
  try {
    const db = await initDB();
    const dataFromIDB = await new Promise<any>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(DATA_KEY);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (dataFromIDB && typeof dataFromIDB === 'object') {
      return dataFromIDB;
    }
  } catch (err) {
    console.warn('IndexedDB load fallback to localStorage:', err);
  }

  // 2. Fallback to localStorage
  try {
    const savedLocal = localStorage.getItem(STORAGE_KEY);
    if (savedLocal) {
      return JSON.parse(savedLocal);
    }
  } catch (err) {
    console.error('Failed to parse saved studio data from localStorage:', err);
  }

  return null;
}

export async function clearStorageEngine(): Promise<void> {
  try {
    const db = await initDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(DATA_KEY);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {}

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
