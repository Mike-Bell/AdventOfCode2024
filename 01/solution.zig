const std = @import("std");
const content = @embedFile("./input.txt");

pub fn main() !void {
    var t = try std.time.Timer.start();

    // initial parsing stuff
    var splits = std.mem.split(u8, content, "\r\n");
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();

    var left = std.ArrayList(i32).init(allocator);
    var right = std.ArrayList(i32).init(allocator);

    while (splits.next()) |line| {
        var it = std.mem.split(u8, line, "   ");
        const first = try std.fmt.parseInt(i32, it.first(), 10);
        const second = try std.fmt.parseInt(i32, it.next().?, 10);
        try left.append(first);
        try right.append(second);
    }

    // Part 1
    std.mem.sort(i32, left.items, {}, std.sort.asc(i32));
    std.mem.sort(i32, right.items, {}, std.sort.asc(i32));

    var ans: u32 = 0;
    for (0.., left.items) |i, elem| {
        ans += @abs(elem - right.items[i]);
    }
    std.debug.print("{d}\n", .{ans});

    // Part 2
    var counts = std.AutoHashMap(i32, i32).init(allocator);

    for (right.items) |elem| {
        const existing = counts.get(elem);
        try counts.put(elem, if (existing == null) 1 else existing.? + 1);
    }

    var ans2: i32 = 0;
    for (left.items) |elem| {
        const mult = counts.get(elem);
        ans2 = ans2 + elem * (if (mult == null) 0 else mult.?);
    }

    std.debug.print("{d}\n", .{ans2});
    std.debug.print("time:{s}\n", .{std.fmt.fmtDuration(t.read())});
}
