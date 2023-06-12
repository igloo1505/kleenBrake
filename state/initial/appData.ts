import { IconType } from "react-icons/lib"
import { AppStatItemType, ContributorType, FeatureLabelType, HighlightedFeatureType, ReviewType } from "../../types/UITypes"

const tempUserFakeImage = "/assets/development/userImage.png"

export enum SocialEnum {
    twitter = "twitter",
    facebook = "facebook",
    instagram = "instagram",
    youtube = "youtube"
}


export interface SocialType {
    url: string
    iconKey: SocialEnum
}

export interface AppDataType {
    authentication: {
        loginPageHeading: string,
        callToLoginCardHeader: string,
        callToLoginCardBody: string,
        signup: {
            title: string,
            subtitle: string
        }
    },
    landing: {
        heroMainTitle: string,
        heroSubTitle: string,
        heroCardBody: string,
        highlightedFeatureSection: {
            title: string,
            subtitle: string
        },
        callToAction: {
            title: string,
            body: string
        },
        allFeatures: {
            items: HighlightedFeatureType[]
        },
        safeAndAnonymous: {
            title: string,
            body: string
        },
        reviewUI: {
            title: string,
            body: string
        }
        reviews: ReviewType[]
    },
    appStats: {
        items: AppStatItemType[]
    },
    featureLabels: FeatureLabelType[],
    highlightedFeatures: HighlightedFeatureType[]
    socials: SocialType[]
    aboutUs: {
        missionTitle: string,
        description: string[]
        bulletListTitle: string
        bulletPoints: string[]
        contributors: ContributorType[]
    }
}

export const groupFeatureLabels = (featureLabels: FeatureLabelType[]) => {
    if (!featureLabels) {
        return {}
    }
    return {
        "seller": featureLabels.filter((label) => label.category === "seller"),
        "buyer": featureLabels.filter((label) => label.category === "buyer"),
        "content": featureLabels.filter((label) => label.category === "content"),
    }
}


const appData: AppDataType = {
    authentication: {
        loginPageHeading: "Member Login",
        callToLoginCardHeader: "Not a Member yet",
        callToLoginCardBody: "Registering is fast, simple, and secure.",
        signup: {
            title: "Sign Up",
            subtitle: "Create your free account in seconds"
        }
    },
    landing: {
        heroMainTitle: "Dignissim nisl vulputate condimentum erat.",
        heroSubTitle: "Vitae cursus nulla dui justo morbi maximus condimentum at consectetur. ",
        heroCardBody: "Et nulla ac vestibulum amet auctor platea nibh suscipit dignissim, elementum sit eleifend aliquet diam magna pretium ac efficitur efficitur in in faucibus. Pretium condimentum ligula. Gravida platea posuere placerat et non. Eget bibendum dolor arcu massa in amet nunc urna ante neque viverra, dignissim nisl quisque dui sem convallis, donec porttitor rhoncus nullam dolor. Diam non tincidunt eget semper diam suscipit nibh,. Volutpat quisque bibendum sit hac a suscipit ultrices vel condimentum quis, suscipit cras nibh vulputate eleifend, id convallis vitae at porttitor orci semper turpis feugiat auctor semper morbi. Tempor suscipit odio ex faucibus faucibus tincidunt condimentum, elementum.",
        highlightedFeatureSection: {
            title: "Ut pretium augue libero.",
            subtitle: "Dapibus dapibus amet magna consequat praesent magna nullam convallis nisl sed a arcu et faucibus dignissim non, sem eget tincidunt."
        },
        callToAction: {
            title: "Sed donec risus pharetra suspendisse eleifend et cursus.",
            body: "Lectus sit cras quisque vel laoreet, sed ante lectus lectus quisque nulla vitae ac nam convallis dui vel a metus arcu est enim lectus ante. Iaculis nisl leo blandit tempor natoque turpis orci, lorem quisque ac consequat sed ridiculus cursus ultrices auctor ut dictumst non dui dignissim posuere nulla risus."
        },
        allFeatures: {
            items: [
                {
                    title: "Nulla est lorem at ac,.",
                    body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
                    iconClass: "FaPlayCircle"
                },
                {
                    title: "Nulla est lorem at ac,.",
                    body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
                    iconClass: "FaUnlock"
                },
                {
                    title: "Nulla est lorem at ac,.",
                    body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
                    iconClass: "FaCoins"
                },
                {
                    title: "Nulla est lorem at ac,.",
                    body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
                    iconClass: "FaCoins"
                },
                {
                    title: "Nulla est lorem at ac,.",
                    body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
                    iconClass: "FaPlayCircle"
                },
                {
                    title: "Nulla est lorem at ac,.",
                    body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
                    iconClass: "FaUnlock"
                },
                {
                    title: "Nulla est lorem at ac,.",
                    body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
                    iconClass: "FaCoins"
                },
                {
                    title: "Nulla est lorem at ac,.",
                    body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
                    iconClass: "FaCoins"
                },
                {
                    title: "Nulla est lorem at ac,.",
                    body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
                    iconClass: "FaPlayCircle"
                },
                {
                    title: "Nulla est lorem at ac,.",
                    body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
                    iconClass: "FaUnlock"
                },
                {
                    title: "Nulla est lorem at ac,.",
                    body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
                    iconClass: "FaCoins"
                },
                {
                    title: "Nulla est lorem at ac,.",
                    body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
                    iconClass: "FaCoins"
                },
            ]
        },
        safeAndAnonymous: {
            title: "In dignissim fermentum.",
            body: "Convallis sem sit est convallis quam dictumst placerat nam mi egestas fermentum nibh sem libero bibendum auctor nullam turpis elementum tempor placerat dignissim finibus libero imperdiet, aenean tortor tristique. Praesent velit et porttitor non nibh tristique, elementum vitae tempor tincidunt augue arcu arcu, luctus nulla ac faucibus semper ut amet."
        },
        reviewUI: {
            title: "Condimentum porta vitae.",
            body: "Tempor nibh condimentum duis sit, arcu quisque posuere pellentesque dapibus aliquam diam nunc in dui,."
        },
        reviews: [
            {
                user: "someUserId",
                body: "Convallis consequat quis quam vulputate feugiat massa dui amet consectetur suscipit tempus lorem eget eu,. Purus enim purus nullam proin nulla et tempor nunc euismod turpis varius purus, ridiculus id.",
                rating: 8,
                image: tempUserFakeImage,
                date: Date.now()
            },
            {
                user: "someUserId",
                body: "Convallis consequat quis quam vulputate feugiat massa dui amet consectetur suscipit tempus lorem eget eu,. Purus enim purus nullam proin nulla et tempor nunc euismod turpis varius purus, ridiculus id.",
                rating: 9,
                image: tempUserFakeImage,
                date: Date.now()
            },
            {
                user: "someUserId",
                body: "Convallis consequat quis quam vulputate feugiat massa dui amet consectetur suscipit tempus lorem eget eu,. Purus enim purus nullam proin nulla et tempor nunc euismod turpis varius purus, ridiculus id.",
                rating: 10,
                image: tempUserFakeImage,
                date: Date.now()
            },
            {
                user: "someUserId",
                body: "Convallis consequat quis quam vulputate feugiat massa dui amet consectetur suscipit tempus lorem eget eu,. Purus enim purus nullam proin nulla et tempor nunc euismod turpis varius purus, ridiculus id.",
                rating: 10,
                image: tempUserFakeImage,
                date: Date.now()
            },
        ]
    },
    appStats: {
        items: [
            {
                label: "Active Users",
                value: 9999999,
                formatValue: "number"
            },
            {
                label: "Dollars Made",
                value: 123456789,
                formatValue: "number"
            },
            {
                label: "Media Items",
                value: 123456789,
                formatValue: "number"
            },
            {
                label: "Messages Shared",
                value: 123456789,
                formatValue: "number"
            },
        ]
    },
    featureLabels: [
        {
            label: "Nulla est lorem at ac,.",
            category: "buyer"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "buyer"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "buyer"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "buyer"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "buyer"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "buyer"
        },

        {
            label: "Nulla est lorem at ac,.",
            category: "seller"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "seller"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "seller"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "seller"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "seller"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "seller"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "content"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "content"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "content"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "content"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "content"
        },
        {
            label: "Nulla est lorem at ac,.",
            category: "content"
        },
    ],
    highlightedFeatures: [
        {
            title: "Nulla est lorem at ac,.",
            body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
            iconClass: "FaPlayCircle"
        },
        {
            title: "Nulla est lorem at ac,.",
            body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
            iconClass: "FaUnlock"
        },
        {
            title: "Nulla est lorem at ac,.",
            body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
            iconClass: "FaCoins"
        },
        {
            title: "Nulla est lorem at ac,.",
            body: "Nulla in eu curabitur hac enim bibendum praesent sed ante dictum tempor eget neque, elit molestie condimentum laoreet, a nec in lacus duis. Feugiat aenean at in id ipsum suspendisse.",
            iconClass: "FaCoins"
        },
    ],
    socials: [
        {
            url: "https://facebook.com",
            iconKey: SocialEnum.facebook
        },
        {
            url: "https://instagram.com",
            iconKey: SocialEnum.instagram
        },
        {
            url: "https://youtube.com",
            iconKey: SocialEnum.youtube
        },
    ],
    aboutUs: {
        missionTitle: "Ut et vestibulum amet nisi eu, platea vitae sapien imperdiet.",
        description: [
            "Dui eget nulla, justo ut ac sapien et dictumst posuere consectetur dignissim consectetur in magna, non. Lacus fermentum eu amet enim, enim aenean integer a dignissim nibh sit laoreet semper nulla enim diam dignissim nibh consectetur. Non risus faucibus, sed ac in ultrices ultricies eget, convallis sed ultrices ultricies dictum.",
            "Faucibus cras sed sit cursus, aenean eu dapibus magna, tellus consequat massa ac eros nec maximus cras pretium ac, arcu rhoncus porta imperdiet vestibulum sit eget ridiculus praesent. "
        ],
        bulletListTitle: "Quisque porta nunc sit nisl ac condimentum vitae ac eu.",
        bulletPoints: [
            "Let me know if you want me to center these. If they're long enough to wrap it might look better aligned to the left, but if they're short centering might get rid of the akward flow with everything else being centered.",
            "Posuere ac sem ac dolor finibus varius dis condimentum sit.",
            "Posuere ac sem ac dolor finibus varius dis condimentum sit.",
            "Posuere ac sem ac dolor finibus varius dis condimentum sit.",
            "Posuere ac sem ac dolor finibus varius dis condimentum sit."
        ],
        contributors: [
            {
                name: "Random Dude",
                position: "Bossman",
                imagePath: "/assets/development/contributorImage.jpg",
                title: "Montes porta in tortor.",
                body: "Elementum eu eleifend eu ac. Lectus in eros nunc, et dui. Id nec lectus neque libero luctus porttitor vitae, id pulvinar et. Dapibus sit ante cursus lacus in sagittis sem condimentum etiam et eget congue dictumst nullam sapien dui suspendisse tincidunt amet vel pellentesque aliquam diam ac a nulla elit."
            },
            {
                name: "Random Dude",
                position: "Bossman",
                imagePath: "/assets/development/contributorImage.jpg",
                title: "Montes porta in tortor.",
                body: "Elementum eu eleifend eu ac. Lectus in eros nunc, et dui. Id nec lectus neque libero luctus porttitor vitae, id pulvinar et. Dapibus sit ante cursus lacus in sagittis sem condimentum etiam et eget congue dictumst nullam sapien dui suspendisse tincidunt amet vel pellentesque aliquam diam ac a nulla elit."
            },
            {
                name: "Random Dude",
                position: "Bossman",
                imagePath: "/assets/development/contributorImage.jpg",
                title: "Montes porta in tortor.",
                body: "Elementum eu eleifend eu ac. Lectus in eros nunc, et dui. Id nec lectus neque libero luctus porttitor vitae, id pulvinar et. Dapibus sit ante cursus lacus in sagittis sem condimentum etiam et eget congue dictumst nullam sapien dui suspendisse tincidunt amet vel pellentesque aliquam diam ac a nulla elit."
            },
            {
                name: "Random Dude",
                position: "Bossman",
                imagePath: "/assets/development/contributorImage.jpg",
                title: "Montes porta in tortor.",
                body: "Elementum eu eleifend eu ac. Lectus in eros nunc, et dui. Id nec lectus neque libero luctus porttitor vitae, id pulvinar et. Dapibus sit ante cursus lacus in sagittis sem condimentum etiam et eget congue dictumst nullam sapien dui suspendisse tincidunt amet vel pellentesque aliquam diam ac a nulla elit."
            },
        ]
    }

}


export default appData
