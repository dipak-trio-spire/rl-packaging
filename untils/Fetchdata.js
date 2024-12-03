export async function fetchHomedata(slug) {
    try {
        const response = await fetch(`https://rlpackaging.ca/wp-json/custom-api/v1/page-acf-and-options/${slug}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch headerText from API route: ", error);
        return { error: 'Failed to fetch data'};
    }
}

export async function GetProductsPost() {
    try {
        const response = await fetch("https://rlpackaging.ca/wp-json/wp/v2/product")
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch headerText from API route: ", error);
        return { error: 'Failed to fetch data'};
    }
}

export async function GetPrivacyPage(slug) {
    try {
        const response = await fetch(`https://rlpackaging.ca/wp-json/wp/v2/pages?slug=${slug}`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch headerText from API route: ", error);
        return { error: 'Failed to fetch data'};
    }
}


export default {
    fetchHomedata , 
    GetProductsPost,
    GetPrivacyPage
}