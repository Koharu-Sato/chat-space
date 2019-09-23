wd = ["日", "月", "火", "水", "木", "金", "土"]
time = Time.now
Time::DATE_FORMATS[:default] = "%Y/%m/%d(#{wd[time.wday]}) %H:%M"

