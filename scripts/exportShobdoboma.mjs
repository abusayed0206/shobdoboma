// scripts/exportShobdoboma.mjs
import { createClient } from '@supabase/supabase-js'
import { createObjectCsvWriter } from 'csv-writer'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Supabase URL or Key is missing. Please check your .env.local file.',
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// File path where the CSV will be saved
const FILE_PATH = path.join(__dirname, '..', 'public', 'shobdoboma.csv')

// Function to fetch data from Supabase
const fetchShobdobomaData = async () => {
  const { data, error } = await supabase
    .from('shobdo')
    .select('id,boma, nam, poricoy')
  if (error) {
    console.error('Error fetching data from Supabase:', error)
    process.exit(1)
  }
  return data
}

// Function to save data as CSV
const saveAsCsv = async (data) => {
  const csvWriter = createObjectCsvWriter({
    path: FILE_PATH,
    header: [
      { id: 'id', title: 'ID' },
      { id: 'boma', title: 'Boma' },
      { id: 'nam', title: 'Name' },
      { id: 'poricoy', title: 'Poricoy' },
    ],
  })
  await csvWriter.writeRecords(data)
  console.log('CSV file created at', FILE_PATH)
}

// Main function to run the process
const main = async () => {
  try {
    const data = await fetchShobdobomaData()
    await saveAsCsv(data)
    console.log('CSV export completed successfully.')
  } catch (error) {
    console.error('Error during CSV export:', error)
  }
}

main()
