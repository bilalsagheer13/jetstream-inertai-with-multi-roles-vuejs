import { vueFetch } from "use-lightweight-fetch";

// get image
const {
    handleData: handleGetImage,
    fetchedData: fetchedImage,
    isError: isErrorImage,
    isLoading: isLoadingImage,
    isSuccess: isSuccessImage,
} = vueFetch();

// get images
const {
    handleData: handleGetImages,
    fetchedData: fetchedMedia,
    isError: isErrorImages,
    isLoading: isLoadingImages,
    isSuccess: isSuccessImages,
} = vueFetch();

export default {
    namespaced: true,

    // state
    state: {
        currentImage: {},
        currentMedia: null,
        currentPreviewImage: null,
        // end state
    },

    // getters
    getters: {
        getCurrentImage(state) {
            return state.currentImage;
        },
        getCurrentMedia(state) {
            return state.currentMedia;
        },
        getCurrentPreviewImage(state) {
            return state.currentPreviewImage;
        },

        // end getters
    },

    // mutations
    mutations: {
        setCurrentImage(state, payload) {
            state.currentImage = payload;
        },
        setCurrentMedia(state, payload) {
            state.currentMedia = payload;
        },
        setCurrentPreviewImage(state, payload) {
            state.currentPreviewImage = payload;
        },

        // end mutations
    },

    // actions
    actions: {
        // get images
        loadMedia(context, data) {
            if (data.search_query === undefined) {
                data.search_query = "";
            }
            if (data.page === undefined) {
                data.page = "";
            }

            // fetch media
            handleGetImages(
                `/overview/media/index/${data.teamId}/?search_query=${data.search_query}&page=${data.page}`
            );
            // context & send to mutation
            context.commit("setCurrentMedia", {
                fetchedMedia: fetchedMedia,
                isError: isErrorImages,
                isLoading: isLoadingImages,
                isSuccess: isSuccessImages,
            });
        },

        //
        // get image
        loadImage(context, data) {
            // fetch image
            handleGetImage(
                `/overview/media/edit/${data.mediaLibraryId}/${data.teamId}`
            );
            // // context & send to mutation
            context.commit("setCurrentImage", {
                currentImage: fetchedImage,
                isError: isErrorImage,
                isLoading: isLoadingImage,
                isSuccess: isSuccessImage,
            });
        },
        // end action
    },
};