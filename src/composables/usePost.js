import { ref } from 'vue'

export function usePost(url) {
    const responseData = ref(null)
    const error = ref(null)
    const loading = ref(false)

    const postData = async (payload) => {
        loading.value = true
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            })
            if (!response.ok) throw new Error(`Error: ${response.statusText}`)
            responseData.value = await response.json()
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    return { responseData, error, loading, postData }
}
