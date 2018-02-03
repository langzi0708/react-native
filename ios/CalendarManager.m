//
//  CalendarManager.m
//  cqbListView
//
//  Created by wangzheng on 2017/12/18.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CalendarManager.h"

@implementation CalendarManager
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location resolver:(RCTResponseSenderBlock)callback)
{
  
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}
//回调给rn  RCT_EXPORT_METHOD 这个宏可以自定义方法的
RCT_EXPORT_METHOD(doSomething:(NSString *)testStr resolver:(RCTResponseSenderBlock)callback){
  NSString *callbackData = @"Callback数据"; //准备回调回去的数据
  callback(@[[NSNull null],callbackData]);
}
@end
