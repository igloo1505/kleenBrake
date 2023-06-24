"use client"
import React, { useEffect } from 'react'
import LandingDevSection from '../../components/testing/LandingDevSection';
import AppStatsLandingPanel from '../../components/landing/appStatsPanel/AppStatsLandingPanel';
import { connect } from 'react-redux';
import store, { RootState } from '../../state/store';
import { AppDataType } from '../../state/initial/appData';
import FeaturesSection from '../../components/landing/features/FeaturedSection';
import FeatureHighlightSection from '../../components/landing/features/FeatureHighlightSection';
import LowerCallToAction from '../../components/landing/LowerCallToAction';
import AllFeaturesSection from '../../components/landing/features/AllFeaturesSection';
import SafeAndAnonymousSection from '../../components/landing/SafeAndAnonymous';
import ReviewSection from '../../components/landing/reviews/ReviewSection';
import HeroSection from '../../components/landing/Hero';
import { logout } from '../../state/slices/auth';

const connector = connect((state: RootState, props: any) => ({
    appData: state.UI.appData,
    props: props
}))

const UnauthenticatedHome = connector(({ appData }: { appData: AppDataType }) => {
    /* useEffect(() => { */
    /*     store.dispatch(logout()) */
    /* }, []) */
    return (
        <div className={'w-screenFit'}>
            <HeroSection />
            <AppStatsLandingPanel appStats={appData.appStats} />
            <FeaturesSection appData={appData} />
            <FeatureHighlightSection highlightedFeatures={appData.highlightedFeatures} featuredSectionDetails={appData.landing.highlightedFeatureSection} />
            <LowerCallToAction callToAction={appData.landing.callToAction} />
            <AllFeaturesSection allFeatures={appData.landing.allFeatures} />
            <SafeAndAnonymousSection details={appData.landing.safeAndAnonymous} />
            <ReviewSection reviews={appData.landing.reviews} reviewUI={appData.landing.reviewUI} />
            <LandingDevSection />
        </div>
    )
})

UnauthenticatedHome.displayName = "UnauthenticatedHome"

export default UnauthenticatedHome;
