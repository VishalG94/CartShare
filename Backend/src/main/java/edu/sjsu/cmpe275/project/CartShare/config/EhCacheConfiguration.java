package edu.sjsu.cmpe275.project.CartShare.config;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.config.CacheConfiguration;
import org.springframework.cache.annotation.CachingConfigurationSelector;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching

public class EhCacheConfiguration extends CachingConfigurerSupport {

//    @Bean
//    public APIFilter api

    @Bean
    public CacheManager ehCacheManager(){
        CacheConfiguration fifteenMinCache = new CacheConfiguration();
        fifteenMinCache.setName("fifteen-min-cache");
        fifteenMinCache.setMemoryStoreEvictionPolicy("LRU");
        fifteenMinCache.setMaxEntriesLocalHeap(300);
        fifteenMinCache.setTimeToLiveSeconds(900);

        CacheConfiguration thirtyMinCache = new CacheConfiguration();
        thirtyMinCache.setName("thirty-min-cache");
        thirtyMinCache.setMemoryStoreEvictionPolicy("LFU");
        thirtyMinCache.setMaxEntriesLocalHeap(100);
        thirtyMinCache.setTimeToLiveSeconds(2000);

        net.sf.ehcache.config.Configuration config = new net.sf.ehcache.config.Configuration();
        config.addCache(fifteenMinCache);
        config.addCache(thirtyMinCache);
        return CacheManager.newInstance(config);
    }

    @Bean
    @Override
    public org.springframework.cache.CacheManager cacheManager() {
        return new EhCacheCacheManager(ehCacheManager());
    }
}
