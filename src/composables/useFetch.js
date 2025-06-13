import { ref, watchEffect } from 'vue'

export function useFetch(url, options = {}) {
    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);
    const fetchData = async () => {
        loading.value = true;
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Authorization': `Basic ${import.meta.env.VITE_API_KEY}`,
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            })
            if (!response.ok) throw new Error(`Error: ${response.statusText}`)
            data.value = await response.json()
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    watchEffect(() => {
        fetchData()
    })

    return { data, error, loading, fetchData }
}