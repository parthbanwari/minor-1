import axios from 'axios'
import { LANGUAGE_ID_MAP } from '../../constants.js'

const API = axios.create({
    baseURL: 'https://judge0-ce.p.rapidapi.com',
    headers: {
        'x-rapidapi-key': 'f38cf76294msh9dbd6863cfca3d0p1f0169jsn7d11ebdee685',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    },
})

const getSubmissionResult = async (token) => {
    let status
    let result

    do {
        result = await API.get(`/submissions/${token}`)
        status = result.data.status?.id
        if (status === 1 || status === 2) {
            await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait for 2 seconds before retrying
        }
    } while (status === 1 || status === 2)

    return result.data
}

export const executeCode = async (language, sourceCode) => {
    try {
        const response = await API.post('/submissions', {
            language_id: LANGUAGE_ID_MAP[language],
            source_code: sourceCode,
        })

        const { token } = response.data

        const result = await getSubmissionResult(token)

        return result
    } catch (error) {
        console.error('Error executing code:', error)
        throw new Error('Failed to execute code. Please try again.')
    }
}
