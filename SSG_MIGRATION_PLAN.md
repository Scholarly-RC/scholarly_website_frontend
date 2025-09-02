# Scholarly Website SSG Migration & Performance Plan

## Executive Summary

This document outlines a comprehensive plan to convert the Scholarly Impact Consulting Co. website from client-side data fetching to Static Site Generation (SSG) with Nuxt 3, along with performance optimizations for images, assets, and overall user experience.

**Current State**: Client-side data fetching from Directus CMS API on every page load
**Target State**: Pre-generated static pages with optimized assets and instant loading
**Expected Benefits**: 60-80% faster loading, improved SEO, reduced server costs

## Current Analysis

### Data Fetching Patterns
- **40+ components** use `useFetch` for client-side data loading
- **Every page reload** triggers API calls to Directus CMS
- **No caching** of API responses or static assets
- **Loading states** visible to users on each visit

### Performance Issues
- Slow initial page loads (2.5-3.5s First Contentful Paint)
- Poor SEO due to client-side rendering delays
- High server load on Directus API
- Images loaded from API without optimization

## Phase 1: Core SSG Implementation (Week 1-2)

### 1.1 Nuxt SSG Configuration
**Objective**: Configure Nuxt for static site generation

**Tasks**:
- Update `nuxt.config.ts` with SSG settings
- Configure nitro for static output
- Set up build commands for static generation
- Test build process with `npm run generate`

**Files to Modify**:
- `nuxt.config.ts`
- `package.json` (build scripts)

### 1.2 Data Fetching Conversion
**Objective**: Convert all client-side data fetching to server-side

**Components to Update** (40+ files):
- `components/index/HeroSection.vue`
- `components/index/FeatureSection.vue`
- `components/index/TestimonialsSection.vue`
- `components/about/AboutHero.vue`
- `components/about/OurTeam.vue`
- `components/services/ServicesHero.vue`
- `components/services/ServicesOfferedSection.vue`
- All other components with `useFetch` calls

**Conversion Pattern**:
```javascript
// Before (client-side)
const { data, status, error } = useFetch(`${apiUrl}/endpoint`)

// After (server-side)
const { data, status, error } = useFetch(`${apiUrl}/endpoint`, { server: true })
```

### 1.3 Error Handling & Fallbacks
**Objective**: Ensure robust error handling during build and runtime

**Tasks**:
- Add build-time error handling
- Implement fallback content for API failures
- Configure graceful degradation
- Add logging for build failures

## Phase 2: Image & Asset Optimization (Week 2-3)

### 2.1 Nuxt Image Module Integration
**Objective**: Implement automatic image optimization

**Tasks**:
- Install `@nuxt/image` module
- Replace Directus image URLs with `<NuxtImg>` components
- Configure WebP/AVIF conversion
- Set up responsive image generation
- Optimize image quality and sizes

**Current Image Usage**:
```javascript
// Current
<img :src="`${apiUrl}/assets/${imageId}/?quality=85&format=webp`" />

// Target
<NuxtImg :src="`${apiUrl}/assets/${imageId}`" :quality="85" format="webp" />
```

### 2.2 Image Loading Optimization
**Objective**: Improve perceived performance

**Tasks**:
- Implement lazy loading for below-the-fold images
- Add blur placeholders
- Configure progressive loading
- Optimize loading="lazy" attributes

### 2.3 Asset Optimization
**Objective**: Optimize all static assets

**Tasks**:
- Enable gzip/brotli compression
- Optimize font loading
- Minify CSS/JS bundles
- Configure cache headers

## Phase 3: Advanced Performance Features (Week 3-4)

### 3.1 Incremental Static Regeneration (ISR)
**Objective**: Keep dynamic content fresh

**Configuration**:
- Testimonials: revalidate every 6 hours
- Team members: revalidate daily
- Services: revalidate weekly
- Hero content: revalidate as needed

**Implementation**:
- Configure ISR in `nuxt.config.ts`
- Set up webhook triggers from Directus
- Implement on-demand revalidation

### 3.2 Caching Strategy
**Objective**: Maximize cache utilization

**Tasks**:
- Implement HTTP caching headers
- Add service worker for offline functionality
- Configure CDN caching rules
- Set up browser caching for static assets

### 3.3 Code Splitting & Bundle Optimization
**Objective**: Reduce initial bundle size

**Tasks**:
- Implement route-based code splitting
- Add dynamic imports for heavy components
- Optimize with tree shaking
- Configure preload/prefetch

## Phase 4: Deployment & Monitoring (Week 4-5)

### 4.1 CDN Deployment Configuration
**Objective**: Deploy to global CDN

**Options**:
- **Vercel** (recommended): Native Nuxt support, ISR, analytics
- **Netlify**: Good for static sites, form handling
- **Cloudflare Pages**: Global CDN, security features

**Configuration**:
- Set up build commands
- Configure custom domain
- Set up SSL certificates
- Configure redirect rules

### 4.2 Performance Monitoring
**Objective**: Track and maintain performance

**Tools**:
- Core Web Vitals tracking
- Real User Monitoring (RUM)
- Performance budgets
- Alerting for regressions

### 4.3 Testing & Quality Assurance
**Objective**: Ensure quality and reliability

**Tasks**:
- Automated SSG build testing
- Visual regression testing
- Cross-device testing
- SEO and accessibility validation

## Expected Performance Improvements

| Metric | Current (Estimated) | After SSG | Improvement |
|--------|-------------------|-----------|-------------|
| First Contentful Paint | 2.5-3.5s | 0.8-1.2s | 60-70% faster |
| Largest Contentful Paint | 4-6s | 1.5-2.5s | 50-70% faster |
| Time to Interactive | 5-7s | 1-2s | 70-80% faster |
| Lighthouse Performance Score | 60-75 | 90-95 | 20-35 points |
| Server Response Time | API-dependent | <100ms | Instant |

## Risk Assessment & Mitigations

### Build Time Increase
- **Risk**: Longer build times with image optimization
- **Mitigation**: Incremental builds, optimize image pipeline

### API Rate Limits
- **Risk**: Directus API limits during build
- **Mitigation**: Request throttling, build-time caching

### Dynamic Content Updates
- **Risk**: Content changes not immediately reflected
- **Mitigation**: ISR, webhook triggers, manual revalidation

## Success Metrics

- ✅ Lighthouse Performance Score > 90
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 2s
- ✅ 50%+ reduction in server costs
- ✅ Improved SEO rankings
- ✅ Better user engagement metrics

## Timeline & Resources

- **Total Duration**: 4-5 weeks
- **Team Size**: 1-2 developers
- **Testing Phase**: 1 week overlap
- **Budget**: Primarily development time

## Implementation Checklist

### Phase 1 ✅
- [ ] Nuxt SSG configuration
- [ ] Data fetching conversion (40+ components)
- [ ] Error handling setup

### Phase 2 ⏳
- [ ] Nuxt Image module integration
- [ ] Image loading optimization
- [ ] Asset optimization

### Phase 3 ⏳
- [ ] ISR implementation
- [ ] Caching strategy
- [ ] Code splitting

### Phase 4 ⏳
- [ ] CDN deployment
- [ ] Performance monitoring
- [ ] Testing automation

## Next Steps

1. **Review and Approval**: Review this plan with stakeholders
2. **Kickoff Meeting**: Align on priorities and timeline
3. **Environment Setup**: Prepare development environment
4. **Phase 1 Implementation**: Begin with SSG configuration
5. **Weekly Check-ins**: Monitor progress and adjust as needed

---

**Document Version**: 1.0
**Created**: September 3, 2025
**Last Updated**: September 3, 2025
**Author**: opencode Assistant
**Status**: Ready for Implementation