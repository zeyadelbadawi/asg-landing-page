import { google } from "googleapis"

export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({ error: "Method not allowed" })

  }

  // Credentials

  const CLIENT_EMAIL = "website-form-submissions@asg-distry.iam.gserviceaccount.com"

  const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDbC8XgB/PLftj
NjQ4HB1vBWSbvavLFds3yd7EyguyXi06Vg0dmB2CEMTlGtAYyfHqJpAIl2TDqso2
bxEDTcudRXl46zBWtQI4QuTeXmOXnc8OOLEHkEfp2Yk21KX10yKTpb0BTblO0Xq+
Dh+stZsQJTk+J55DZaw2pTgBeF9szzs9sv3AxaGAEobf0fbGJXr+jLmk+zHj7dYt
/2rDVFSkcfrIen2T1tgD4f4l+YLK4nTSz5SAUSMRncs92pU1aEsGsaIyCW1u1b1g
bRhk8Zzf8kUEXv1K9JUD8xkPmxDBKGYfXDKWQ0HW27yYStR+cEDiMoaSFLywewjz
ADQ2RsJfAgMBAAECggEASlKx0lFDR8toKYJq99ARjbDSY70OQk3MsvoOxG9HZY4V
y3MAx/mbd2UjTTMWY+ciH3iNHQdfJl+lSnCRWt1SjDzpBwkDuGZdMsKWQtBJNlep
cPI0ufiwsQqv+e+EMusa4maNbJp/2K8o7HF4sHndQJW3oKD2uxFHHv1VQJHkUQAQ
Py2rsK4AGRCL2iRZxbzxyJD4nuT2aCpB4V7IdbtBgNJp10PAlTmjieXdzzntP3yk
XwBLV5oUGe5TWQuI88VTHSZc4Kj1RMyzyWbpyeZ9VaBSmoDXD4WsZeMiQNaOQvNh
E+IQi39PjHXCEzNkgM4/wzbD9aJdXStsLxy8KCIgeQKBgQD9qLhb8v3gu1FixtCw
+ZMolelaRvFHDaBFUmOfFnZWDNvAxzNsMxubj21E45wu01TvONnsGhEQvVx5Mn7Z
/rSZ+8lY/xQpfaujGgsCgzYF+G66Q/EFgpBsYFT0h34dMsNcE1JF/D31nR4GJ2Il
7D0rwXeANJv3EGe3TpF79jQ7fQKBgQDFOeC1ucFgimjdPhc+KB5EQrXo0A8u4+UM
smUv/CknZbPMuhMBtxDIv6o6MrRL3o4Gz9f9/1e6c7MzTM4eC+vP/nRJfyYNb/U7
lQUCaQRdtHtQDkcbjWNeZAvVYpXjoZrTw1nLwpTkvTwxNV/eElH4pwQZk+S6fxu8
wurHMhdECwKBgAKDDjhS4rK8CCVLRLvL7Ook+eeb9j2249Rr6XKk3U0i2XZCQr8a
jnZu6C0bd+t6ykeIL5hH9c1NosHMfzcXb6Bqvuazt/ZlOTLnSh6fQAS1HhuYGqXs
UhPQrGazhMszOn4J7vGketSY1rhG4ZDwkvaA9vb9DmJW9j/5djVdDc1dAoGBAK4D
wyCUJOrpNF0Ay8Er5IiV06r26G6W5SGuxVjxQ95e/aVFCEAbJdP6SFfRJQNL+kRI
XmrdQKpiK1q4CaS5H/cEq9WtOgXhIp7PfPwDbLbA54xbDKJivaoq28YKlfWiQNlX
I4OEy5qG3PUOAugNggXCVvu6YbWrMO37jOr0Z1LBAoGBAPJbn0j0NDbtQWJe7zMj
deAe6IXDcHfaWhCpHMMDHU0pNrxixV9LvEVpwU2GKi1Nfne4ysfyFFES6/S7jOGd
vPmm2sS9el97og2SoJFRBtJt3aP5Dh7wTmjx5oYtYuxVpNmDJI02eNkbgsbbZZCA
Q7shvPdald8b7asNmRZfow0q
-----END PRIVATE KEY-----`

  const SPREADSHEET_ID = "1tR4YP3XDmcM6UKvkZXgML_Ef7Ip79kkTJ306z703x1g"

  console.log("[v0] === API REQUEST STARTED ===")

  try {

    const {
        name,
        phone,
        email,
        company,
        service,
        solution,
        message,
        type,
        companyName
      } = req.body


    // Determine sheet name based on submission type
    const SHEET_NAME =
    type === "newsletter"
      ? "Newsletter"
      : type === "landing-page"
        ? "Landing Page"
        : "Contact Form"
    // Validate required fields based on submission type
    if (type === "newsletter") {
      if (!email) {
        return res.status(400).json({ error: "Email is required for newsletter" })
      }
    } else {
     if (!name || !phone || !message) {
  return res.status(400).json({ error: "Name, phone, and message are required" })
}
    }

    // ✅ FIXED AUTH (بدون replace)

    const auth = new google.auth.GoogleAuth({

      credentials: {

        client_email: CLIENT_EMAIL,

        private_key: PRIVATE_KEY.replace(/\\n/g, "\n"),

      },

      scopes: ["https://www.googleapis.com/auth/spreadsheets"],

    })

    const sheets = google.sheets({ version: "v4", auth })

    const headerRange = `${SHEET_NAME}!A1:H1`

    // Ensure sheet exists

    try {

      const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID })

      const sheetExists = spreadsheet.data.sheets.some(

        (s) => s.properties.title === SHEET_NAME

      )

      if (!sheetExists) {

        await sheets.spreadsheets.batchUpdate({

          spreadsheetId: SPREADSHEET_ID,

          requestBody: {

            requests: [

              {

                addSheet: {

                  properties: { title: SHEET_NAME },

                },

              },

            ],

          },

        })

      }

    } catch (e) {

      console.error("Sheet check error:", e)

    }

    const response = await sheets.spreadsheets.values.get({

      spreadsheetId: SPREADSHEET_ID,

      range: `${SHEET_NAME}!A1:Z1`,

    })

    const existingData = response.data.values || []

    // Prepare headers and data based on sheet type
    let headers, values, range

    const timestamp = new Date().toLocaleString("en-US", {

      timeZone: "Africa/Cairo",

    })

    if (type === "newsletter") {
      headers = ["Timestamp", "Email"]
      values = [[timestamp, email]]
      range = `${SHEET_NAME}!A:B`
    } else {
        headers = [
            "Timestamp",
            "Name",
            "Phone",
            "Company",
            "Service",
            "Solution",
            "Message",
            "Company Name",
          ]
          
          values = [[
            timestamp,
            name,
            phone || "",
            company || "",
            service || "",
            solution || "",
            message || "",
            companyName || "",
          ]]
          
          range = `${SHEET_NAME}!A:H`
         }

    // Create headers if sheet is empty

    if (existingData.length === 0) {

      await sheets.spreadsheets.values.update({

        spreadsheetId: SPREADSHEET_ID,

        range: `${SHEET_NAME}!A1:${String.fromCharCode(64 + headers.length)}1`,

        valueInputOption: "USER_ENTERED",

        requestBody: {

          values: [headers],

        },

      })

    }

    // Append data

    await sheets.spreadsheets.values.append({

      spreadsheetId: SPREADSHEET_ID,

      range: range,

      valueInputOption: "USER_ENTERED",

      requestBody: {

        values,

      },

    })

    return res.status(200).json({ message: "Form submitted successfully!" })

  } catch (error) {

    console.error("ERROR:", error)

    return res.status(500).json({ error: "Failed to submit form" })

  }

}