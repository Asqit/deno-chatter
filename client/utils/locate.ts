export async function locate() {
    try {
        const response = await fetch("http://ip-api.com/json")
        
        if (!response.ok) {
            console.log("failed fetch")
            return
        }

        const data = await response.json();
        const kv = await Deno.openKv()

        await kv.set(["geo-location", data.query], data);
    
        kv.close();

    } catch (_) {
        console.log("Failed to locate", _)
    }
}